package main

import (
	"fmt"
	"net/http"

	"github.com/copy/code-runner/internal/config"
	"github.com/copy/code-runner/internal/handlers"
)

// @title        CoPy Code Runner Service
// @version      1.0
// @description  Sandbox code execution service
// @host         localhost:8005
// @BasePath     /
// @schemes      http
func main() {
	port := config.Port()

	http.HandleFunc("/docs.json", func(w http.ResponseWriter, r *http.Request) {
		http.ServeFile(w, r, "docs/swagger.json")
	})

	http.HandleFunc("/health", handlers.GetHealth(port))

	fmt.Printf("[code-runner] :%s\n", port)
	http.ListenAndServe(":"+port, withCORS(http.DefaultServeMux))
}

func withCORS(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Access-Control-Allow-Origin", "*")
		w.Header().Set("Access-Control-Allow-Methods", "GET, POST, OPTIONS")
		w.Header().Set("Access-Control-Allow-Headers", "Content-Type")
		if r.Method == http.MethodOptions {
			w.WriteHeader(http.StatusNoContent)
			return
		}
		next.ServeHTTP(w, r)
	})
}
