import os
import openai

class GPT3Generator:
        def __init__(self, generate_num=60, temperature=0.6, top_p=0.9, repetition_penalty=1.2, model_name='babbage', stop_sequences=['\n', '. "']):
                self.generate_num = generate_num
                self.temperature = temperature
                self.top_p = top_p
                self.repetition_penalty = repetition_penalty
                self.max_tokens = 2048 - generate_num
                self.stop_sequences = stop_sequences
                openai.api_key = os.getenv('OPENAI_API_KEY')
        
        def sample_sequence_raw(self, context):
                try:
                    output = openai.Completion.create(
                        engine = self.model_name,
                        prompt = context,
                        max_tokens = self.generate_num,
                        temperature = self.temperature,
                        top_p = self.top_p,
                        frequency_penalty = self.frequency_penalty,
                        stop = self.stop_sequences
                    )
                    text = output.choices[0].text
                except openai.error.AuthenticationError:
                    print('Invalid OpenAI API Key')
                    text = ''

                return text

        def sample_sequence(self, prompt, context, maxHistory=self.max_tokens):
                assert(prompt + context)
                prompt += "\n" + context

                sample = self.sample_sequence_raw(prompt)

                return sample

