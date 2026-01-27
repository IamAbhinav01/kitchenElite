from fastapi import FastAPI

app =  FastAPI()


@app.post('/')
def welcomePage():
    return "HI HELLo"
