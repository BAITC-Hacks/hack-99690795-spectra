from dotenv import dotenv_values
from openai import OpenAI

config = dotenv_values(".env")

def main():
  client = OpenAI(api_key=config["OPENAI_API_KEY"])


if __name__ == "__main__":
  main()
