package main

import (
	"log"

	"github.com/gin-gonic/gin"
	"github.com/hienvl125/nimble-code-challenge/config"
	"github.com/hienvl125/nimble-code-challenge/db"
	"github.com/hienvl125/nimble-code-challenge/internal/postgresqlrepo"
	"github.com/hienvl125/nimble-code-challenge/internal/restapihandler"
	"github.com/hienvl125/nimble-code-challenge/internal/service"
)

func main() {
	conf, err := config.LoadConfig()
	if err != nil {
		log.Fatalln(err)
	}

	sqlx, err := db.NewPostgreSqlx(conf)
	if err != nil {
		log.Fatalln(err)
	}

	userRepo := postgresqlrepo.NewUserRepo(sqlx)
	accountCreator := service.NewAccountCreator(userRepo)
	authHandler := restapihandler.NewAuthHandler(accountCreator)

	router := gin.Default()
	router.POST("/api/login", authHandler.Register)
	router.Run(":4000")
}
