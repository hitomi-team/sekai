import argparse
import os
import torch
from transformers import GPT2Tokenizer, GPT2LMHeadModel, Trainer, TrainingArguments
from sklearn.model_selection import train_test_split

class TextDataset(torch.utils.data.Dataset):
        def __init__(self, encodings):
                self.examples = encodings
        
        def __getitem__(self, i) -> torch.Tensor:
                return torch.tensor(self.examples[i], dtype=torch.long)
        
        def __len__(self):
                return len(self.examples)

parser = argparse.ArgumentParser()

parser.add_argument('--dataset', type=str, help='Path to dataset')
parser.add_argument('--model', type=str, help='Path to model')
parser.add_argument('--output_dir', type=str, help='Path to model output directory')
parser.add_argument('--epochs', type=int, help='Number of training epochs', default=4)
parser.add_argument('--steps', type=int, help='Number of training steps', default=500)
parser.add_argument('--decay', type=float, help='Strength of weight decay', default=0.001)
parser.add_argument('--train_batch_size', type=int, help='Number of batches for training', default=1)
parser.add_argument('--eval_batch_size', type=int, help='Number of batches for model eval', default=1)

args = parser.parse_args()

tokenizer = GPT2Tokenizer.from_pretrained('gpt2')

with open(args.dataset, 'r') as dataset_file:
        dataset_text = dataset_file.read()

train, test = train_test_split(dataset_text, test_size=0.1)
print("Training Dataset Length: " + str(len(train)))
print("Testing Dataset Length : " + str(len(test)))

train_dataset = TextDataset(tokenizer(train, truncation=True))
test_dataset = TextDataset(tokenizer(test, truncation=True))

model = GPT2LMHeadModel.from_pretrained(args.model)

training_args = TrainingArguments(
        output_dir=args.output_dir,
        num_train_epochs=args.epochs,
        per_device_train_batch_size=args.train_batch_size,
        per_device_eval_batch_size=args.eval_batch_size,
        warmup_steps=args.steps,
        weight_decay=args.decay
)

trainer = Trainer(
        model=model,
        args=training_args,
        train_dataset=train_dataset,
        eval_dataset=test_dataset,
        tokenizer=tokenizer
)

trainer.train()