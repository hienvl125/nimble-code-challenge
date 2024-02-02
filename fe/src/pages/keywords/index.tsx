import type { KeywordOverview } from "@/models/keyword";
import { ListKeywords, GetKeyword, UploadKeyword } from "@/services/keyword_service";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react"
import { useRef, useState } from "react";
import LoadingSpinner from "@/components/LoadingSpinner";
import Paginator from "@/components/Paginator";
import Modal from '@/components/Modal';

export default function Keywords() {
  // Ref
  const fileInputRef = useRef<HTMLInputElement>(null);

  // States
  const [page, setPage] = useState<number>(1)
  const [activeKeywordId, setActiveKeywordId] = useState<number | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isUploadKeywordSuccess, setIsUploadKeywordSuccess] = useState<boolean | null>(null);
  const [isUploadKeywordModalOpen, setIsUploadKeywordModalOpen] = useState<boolean>(false);

  // Next-auth
  const session = useSession();

  // React-query
  const { data: listKeywordsResp, isLoading, refetch: refetchKeywordsListing } = useQuery({
    queryKey: ['keywords', page],
    enabled: session.status === "authenticated",
    queryFn: () => {
      if (!session.data) {
        return null;
      }

      return ListKeywords({ page: page, session: session.data });
    },
  })

  const { data: getKeywordResp, isLoading: isLoadingKeyword } = useQuery({
    queryKey: ['keyword', activeKeywordId],
    enabled: session.status === "authenticated" && activeKeywordId != null,
    queryFn: () => {
      if (!session.data || !activeKeywordId) {
        return null;
      }

      return GetKeyword({ id: activeKeywordId, session: session.data });
    }
  })

  const uploadKeywordsMutation = useMutation({
    mutationFn: UploadKeyword,
    onSuccess: () => {
      setIsUploadKeywordSuccess(true);
      refetchKeywordsListing();
    },
    onError: () => {
      setIsUploadKeywordSuccess(false);
    },
  });

  const onClickUploadKeywordsButton = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  function onChangeCSVInput(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (session.data && file) {
      setIsUploadKeywordModalOpen(true);
      uploadKeywordsMutation.mutate({ file: file, session: session.data });
    }
  };

  function onClickKeywordDetailButton(keywordId: number) {
    setActiveKeywordId(keywordId);
    setIsModalOpen(true);
  }

  return (
    <main className="max-w-screen-lg p-5 mx-auto">
      <h1 className="text-4xl text-center">Keywords Management</h1>
      <input
        type="file"
        accept=".csv"
        onChange={onChangeCSVInput}
        ref={fileInputRef}
        className="hidden"
      />

      <button onClick={onClickUploadKeywordsButton} className="text-white bg-blue-600 rounded-lg px-4 py-2 mt-3 hover:bg-blue-700">
        Upload keywords
      </button>

      {isLoading && (
        <div className="mt-3 w-full flex justify-center">
          <LoadingSpinner />
        </div>
      )}

      {listKeywordsResp && (
        <>
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 mt-3">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">
                  ID
                </th>
                <th scope="col" className="px-6 py-3">
                  Keyword
                </th>
                <th scope="col" className="px-6 py-3">
                  Search results
                </th>
                <th scope="col" className="px-6 py-3">
                  Created at
                </th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {
                listKeywordsResp.keywords.map((keyword: KeywordOverview) => (
                  <tr key={keyword.id} className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                    <td className="px-6 py-4">
                      {keyword.id}
                    </td>
                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                      {keyword.keyword}
                    </th>

                    <td className="px-6 py-4">
                      {keyword.totalSearchResults}
                    </td>
                    <td className="px-6 py-4">
                      {keyword.createdAt.toString()}
                    </td>
                    <td className="px-6 py-4">
                      <button onClick={() => onClickKeywordDetailButton(keyword.id)} className="text-white text-xs bg-blue-600 rounded-lg px-4 py-2 hover:bg-blue-700">
                        Detail
                      </button>
                    </td>
                  </tr>
                ))
              }
            </tbody>
          </table>

          <div className="mt-3 flex justify-end">
            <Paginator
              currentPage={page}
              lastPage={listKeywordsResp.lastPage}
              onClickNextPage={() => {
                if (listKeywordsResp.nextPage) {
                  setPage(listKeywordsResp.nextPage);
                }
              }}
              onClickPrevPage={() => {
                if (listKeywordsResp.previousPage) {
                  setPage(listKeywordsResp.previousPage);
                }
              }}
              onClickPage={(page) => { setPage(page) }}
            />
          </div>
        </>
      )}

      {/* See detail keyword modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => {
          setActiveKeywordId(null);
          setIsModalOpen(false);
        }}
      >
        {isLoadingKeyword && (
          <div className="flex justify-center">
            <LoadingSpinner />
          </div>
        )}

        {getKeywordResp && (
          <>
            <h2 className="text-2xl font-bold mb-4">Detailed keyword</h2>
            <p className="my-1">Keyword: {getKeywordResp.keyword}</p>
            <p className="my-1">Total ads: {getKeywordResp.totalAds}</p>
            <p className="my-1">Total links: {getKeywordResp.totalLinks}</p>
            <p className="my-1">Total search results: {getKeywordResp.totalSearchResults}</p>
            <p className="my-1">Search duration: {getKeywordResp.searchDuration} seconds</p>
            <p className="my-1">HTML</p>
            <textarea readOnly value={getKeywordResp.htmlContent || ""} className="text-sm w-full bg-gray-100" />
          </>
        )}
      </Modal>

      {/* upload csv status modal */}
      <Modal
        isOpen={isUploadKeywordModalOpen}
        onClose={() => {
          setIsUploadKeywordModalOpen(false);
          setIsUploadKeywordSuccess(null);
          refetchKeywordsListing();
        }}
      >
        {
          isUploadKeywordSuccess === null ?
            "Uploading..." :
            isUploadKeywordSuccess ? "Uploaded keywords successfully. The analysis will appear soon." : "Failed to upload keywords. Please try again."
        }
      </Modal>
    </main>
  )
}
