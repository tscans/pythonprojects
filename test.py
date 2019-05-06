from nltk.tokenize import sent_tokenize, word_tokenize
from nltk.corpus import stopwords

example_text = "This is an example showing off stop work filters."

stop_words = set(stopwords.words("english"))

print(stop_words)