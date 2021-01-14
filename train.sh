#!/bin/bash

CUDA_HOME=/usr/lib/cuda-10.2/

MODEL=gpt2-large

DATA_FILE=./dataset/data_compiled.txt
EVAL_FILE=./dataset/data_eval.txt

NUM_STEPS=1000
LOGGING_STEPS=100
BLOCK_SIZE=128
LEARN_RATE=0.00001

NUM_GPU=2
TRAIN_BATCH=1
EVAL_BATCH=1

python -m torch.distributed.launch --nproc_per_node=$NUM_GPU ./server/train_clm.py --model_name_or_path $MODEL --train_file $DATA_FILE --validation_file $EVAL_FILE --evaluation_strategy="steps" --max_steps=$NUM_STEPS --logging_steps=$LOGGING_STEPS --weight_decay 0.001 --learning_rate $LEARN_RATE --per_device_train_batch_size $TRAIN_BATCH --per_device_eval_batch_size $EVAL_BATCH --do_eval --do_train --output_dir ./models --overwrite_output_dir --fp16 --fp16_opt_level O3 --fp16_backend amp  --block_size $BLOCK_SIZE --sharded_ddp
