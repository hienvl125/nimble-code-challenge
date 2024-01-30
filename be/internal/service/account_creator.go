package service

import (
	"context"

	"github.com/hienvl125/nimble-code-challenge/internal/itf/repo"
	"github.com/hienvl125/nimble-code-challenge/internal/itf/usecase"
	"github.com/hienvl125/nimble-code-challenge/internal/itf/usecase/input"
	"github.com/hienvl125/nimble-code-challenge/internal/itf/usecase/output"
)

type accountCreator struct {
	userRepo repo.UserRepository
}

func NewAccountCreator(userRepo repo.UserRepository) usecase.AccountCreator {
	return &accountCreator{
		userRepo: userRepo,
	}
}

func (s accountCreator) Create(ctx context.Context, in input.AccountCreator) (*output.AccountCreator, error) {
	panic("Not implemented yet")
}
