package usecase

import (
	"context"

	"github.com/hienvl125/nimble-code-challenge/internal/itf/usecase/input"
	"github.com/hienvl125/nimble-code-challenge/internal/itf/usecase/output"
)

type AccountCreator interface {
	Create(context.Context, input.AccountCreator) (*output.AccountCreator, error)
}
