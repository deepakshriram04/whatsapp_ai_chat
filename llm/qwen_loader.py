from transformers import pipeline

# Load the model only once
generator = pipeline(
    task="text-generation",
    model="Qwen/Qwen2.5-0.5B-Instruct",
    device_map="auto"
)


def ask_llm(prompt: str) -> str:

    messages = [
        {
            "role": "user",
            "content": prompt
        }
    ]

    result = generator(
        messages,
        max_new_tokens=200,
        do_sample=True,
        temperature=0.7
    )

    return result[0]["generated_text"][-1]["content"]