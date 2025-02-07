package main

import (
	"log"
	"net/http"
)

func main() {
	staticDir := "./web"

	fs := http.FileServer(http.Dir(staticDir))

	http.Handle("/", fs)

	port := "0.0.0.0:80"
	log.Printf("Serving static files from %s on %s", staticDir, port)

	if err := http.ListenAndServe(port, nil); err != nil {
		log.Fatal(err)
	}
}
