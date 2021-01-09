import os
import torch
from transformers import GPT2Tokenizer, GPT2LMHeadModel

class GPT2Generator:
        def __init__(self, generate_num=60, temperature=0.2, top_k=40, top_p=0.9, repetition_penalty=1.2, dtype=torch.float32, batch_size=1, device_type="cpu", model_path='gpt2'):
                self.generate_num = generate_num
                self.temperature = temperature
                self.top_k = top_k
                self.top_p = top_p
                self.repetition_penalty = repetition_penalty
                self.dtype = dtype
                self.batch_size = batch_size
                self.max_tokens = 1024 - generate_num
                self.stop_token = '<|endoftext|>'
                self.device = torch.device(device_type)
                self.tokenizer = GPT2Tokenizer.from_pretrained(model_path)
                self.model = GPT2LMHeadModel.from_pretrained(model_path)
                self.model.to(self.device)

                if dtype == torch.float16:
                        self.model.half()

                self.model.eval()
        
        def tokenize(self, text, maxHistory=1024):
                assert(text)
                context_tokens = self.tokenizer.encode(text, add_special_tokens=False, return_tensors="pt")

                if len(context_tokens) > maxHistory:
                        context_tokens = context_tokens[-maxHistory:]

                return context_tokens.to(self.device)
        
        def sample_sequence_raw(self, context):
                output_sequences = self.model.generate(
                        input_ids=context,
                        max_length = self.generate_num + len(context[0]),
                        temperature = self.temperature,
                        top_k = self.top_k,
                        top_p = self.top_p,
                        repetition_penalty = self.repetition_penalty,
                        do_sample = True,
                        num_return_sequences = 1,
                        pad_token_id=198,
                        eos_token_id=50256
                )

                text = self.tokenizer.decode(output_sequences[0], skip_special_tokens=True)
                return text

        def sample_sequence(self, prompt, context, maxHistory=1024):
                assert(prompt + context)
                prompt += "\n" + context

                encoded_prompt = self.tokenize(prompt)
                sample = self.sample_sequence_raw(encoded_prompt)

                return sample[len(prompt):]

