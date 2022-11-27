from app import app

if __name__ == "__main__":
    # port = int(os.environ.get("PORT", 8008))
    # uvicorn.run(app)
    app.run(host='0.0.0.0', port=5002, debug=True)
