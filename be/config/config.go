package config

import "github.com/kelseyhightower/envconfig"

type Config struct {
	DBUser string `envconfig:"DB_USER" required:"true"`
	DBPass string `envconfig:"DB_PASSWORD" required:"true"`
	DBHost string `envconfig:"DB_HOST" required:"true"`
	DBPort int    `envconfig:"DB_PORT" required:"true"`
	DBName string `envconfig:"DB_NAME" required:"true"`
}

func LoadConfig() (*Config, error) {
	var conf Config
	err := envconfig.Process("", &conf)
	if err != nil {
		return nil, err
	}

	return &conf, nil
}
