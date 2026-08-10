package config

import "os"

func Port() string {
	var p = os.Getenv("CODE_RUNNER_PORT")
	if p != "" {
		return p
	}
	return "8005"
}
