# Knowledge Graph

import os
import json
import re

graph = {}

def graph_encode(keyword, inputstr):
        graph[keyword.lower()] = inputstr

def graph_retrieve(keyword):
        if keyword.lower() in graph:
                return graph[keyword.lower()]
        
        return ''

def graph_delete(keyword):
        if keyword.lower() in graph:
                del graph[keyword.lower()]

# Compiles the context for graph in a string
def graph_compile(inputstr):
        compiled = ''
        inputstr = inputstr.lower()
        for i in graph:
                if i in inputstr:
                        compiled += graph_retrieve(i) + '\n'
        
        return compiled

def graph_save(filepath):
        fp = open(filepath, "w")
        json.dump(graph, fp)

def graph_load(filepath):
        global graph
        try:
                fp = open(filepath, "r")
                if fp:
                        graph = json.load(fp)
                
                return True
        except OSError as e:
                print('Could not find ' + filepath)
                return False

def graph_dict():
        return graph
