package restapihandler

import (
	"github.com/gin-gonic/gin"
	"github.com/hienvl125/nimble-code-challenge/internal/itf/usecase"
)

type authHandler struct {
	accountCreator usecase.AccountCreator
}

func NewAuthHandler(accountCreator usecase.AccountCreator) *authHandler {
	return &authHandler{
		accountCreator: accountCreator,
	}
}

func (h authHandler) Register(c *gin.Context) {
	panic("Not implemented yet")
}
