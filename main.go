package main

import (
	"log"
	"net/http"

	"github.com/mssola/useragent"
)

func logVisitorInfo(r *http.Request) {
	ip := r.Header.Get("CF-Connecting-IP") // Real IP from Cloudflare
	if ip == "" {
		ip = r.RemoteAddr // Fallback if not behind Cloudflare
	}

	ua := useragent.New(r.UserAgent())
	browser, browserVersion := ua.Browser()
	os := ua.OS()
	device := "Desktop"
	if ua.Mobile() {
		device = "Mobile"
	}

	referer := r.Referer()
	cfCountry := r.Header.Get("CF-IPCountry")
	cfCity := r.Header.Get("CF-IPCity")

	log.Printf(`Visitor Info:
	IP: %s
	User-Agent: %s
	Browser: %s %s
	OS: %s
	Device: %s
	Referer: %s
	Country: %s
	City: %s`,
		ip, r.UserAgent(), browser, browserVersion, os, device,
		referer, cfCountry, cfCity)
}

func handlerWithLogging(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		logVisitorInfo(r)
		next.ServeHTTP(w, r)
	})
}

func main() {
	staticDir := "./web"
	fs := http.FileServer(http.Dir(staticDir))

	http.Handle("/", handlerWithLogging(fs))

	port := "0.0.0.0:80"
	log.Printf("Serving static files from %s on %s", staticDir, port)

	if err := http.ListenAndServe(port, nil); err != nil {
		log.Fatal(err)
	}
}
