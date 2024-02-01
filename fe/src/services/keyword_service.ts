import axios from "../utils/axios"
import { Session } from "next-auth";
import type { ListKeywordsResponse, KeywordOverview, Keyword } from "./../models/keyword";

export const ListKeywords = async ({ page, session }: { page: number | null, session: Session }): Promise<ListKeywordsResponse> => {
  const axiosResp = await axios<ListKeywordsResponse | null>({
    method: 'GET',
    url: '/api/keywords',
    headers: {
      Authorization: `Bearer ${session.user.accessToken}`
    },
    params: {
      page: page,
    }
  });

  if (!axiosResp.data) {
    throw new Error("failed to list keywords")
  }

  const pageSize = 10;
  return {
    ...axiosResp.data,
    lastPage: Math.ceil(axiosResp.data.total / pageSize),
  }
}

export const GetKeyword = async ({ id, session }: { id: number, session: Session }): Promise<Keyword> => {
  const axiosResp = await axios<Keyword | null>({
    method: 'GET',
    url: `/api/keywords/${id}`,
    headers: {
      Authorization: `Bearer ${session.user.accessToken}`
    },
  });

  if (!axiosResp.data) {
    throw new Error("failed to get a keyword")
  }

  return axiosResp.data;
}

export const UploadKeyword = async ({ file, session }: { file: File, session: Session }): Promise<void> => {
  const formData = new FormData();
  formData.append('file', file);

  const axiosResp = await axios({
    method: 'POST',
    url: `/api/keywords/`,
    headers: {
      'Content-Type': 'multipart/form-data',
      Authorization: `Bearer ${session.user.accessToken}`
    },
    data: formData,
  });

  if(axiosResp.status != 200) {
    throw new Error("failed to upload keywords")
  }
}
