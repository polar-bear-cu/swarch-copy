package config

import (
	"os"

	"github.com/joho/godotenv"
)

func init() {
	_ = godotenv.Load("../../.env")
}

func Port() string {
	var p = os.Getenv("CODE_RUNNER_PORT")
	if p != "" {
		return p
	}
	return "8005"
}
