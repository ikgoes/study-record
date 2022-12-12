import sys 
import numpy as np
import time
from itertools import combinations

def data_scan(cand_item, dataset):
  freq_set = []
  freq_sup = []

  for transaction in dataset:
    for candidate in cand_item:
      if candidate.issubset(transaction):
        if candidate in freq_set:
          freq_sup[freq_set.index(candidate)] += 1
        else:
          freq_set.append(candidate)
          freq_sup.append(1)
  return freq_set, freq_sup

def check_failed_set(failed, check):
  for i in failed:
    if (len(i.difference(check)))==0:
      return False
  return True

def apriori(L_1, MIN_SUPPORT, file_len, dataset):
    item_len = 2
    frequent_pattern = []
    frequent_itemset = []
    failed_itemset = []
    candidate_itemset = set([])
    
    L_1_length = len(L_1)
    for i in range(L_1_length):
        if L_1[i] < MIN_SUPPORT * file_len:
            continue
        for j in range(i + 1,L_1_length):
            if L_1[j] < MIN_SUPPORT * file_len:
                continue
            candidate_itemset.add(frozenset([i,j]))

    while True:
        frequent_itemset, frequent_support = data_scan(candidate_itemset, dataset)

        for i, val in enumerate(frequent_support):
            if val < MIN_SUPPORT * file_len:
                failed_itemset.append(frequent_itemset[i])
                frequent_itemset[i] = set([])
        
        frequent_itemset = list(filter(lambda x: x!=set([]), frequent_itemset))
        frequent_pattern.append(frequent_itemset)

        candidate_itemset = set([])
        freq_item_len = len(frequent_itemset)
        
        for i in range(freq_item_len):
            for j in range(i+1,freq_item_len):
                possible_candidate = frequent_itemset[i].union(frequent_itemset[j])
                if len(possible_candidate) == item_len+1 and check_failed_set(failed_itemset, possible_candidate): 
                    candidate_itemset.add(possible_candidate)

        item_len += 1 
        if not len(candidate_itemset)==0: continue
        break
    return frequent_pattern

def choosing_two_sides(pattern):
  a = []
  leng = int(len(pattern)) 
  for idx in range(1,leng):
    a = a + [set(i) for i in combinations(list(pattern), idx)]
  b = [pattern-t for t in a]
  return a, b

def association_rule(support, freq_pat, OUTPUT_FILE, file_len, dataset):
  for pattern in freq_pat:
    a, b = choosing_two_sides(pattern)
    variations = int(len(a)/2)
    for idx in range(variations):
      a_cnt = 0 
      b_cnt = 0
      freq = 0
      for trans in dataset:
        if a[idx].issubset(trans):
          a_cnt += 1
          if b[idx].issubset(trans):
            b_cnt += 1
            freq += 1
        elif b[idx].issubset(trans):
          b_cnt += 1
      support = freq/file_len
      ab_confi = support / (b_cnt/file_len)
      ba_confi = support / (a_cnt/file_len)
      OUTPUT_FILE.write("{}\t{}\t{}\t{}\n".format(a[idx],b[idx],format(round(support*100,2),".2f") ,format(round(ab_confi*100,2),".2f")))
      OUTPUT_FILE.write("{}\t{}\t{}\t{}\n".format(b[idx],a[idx],format(round(support*100,2),".2f") ,format(round(ba_confi*100,2),".2f")))
  OUTPUT_FILE.close()

def main():
    start = time.time()
    MIN_SUPPORT = int(sys.argv[1]) / 100
    INPUT_FILE = open(sys.argv[2], "r")
    OUTPUT_FILE = open(sys.argv[3], "w")
    item_set = np.zeros(100)
    dataset = []

    for line in INPUT_FILE:
        transaction = line.split('\t')
        tmp = set(np.array(transaction, dtype='int8'))
        dataset.append(tmp)
        for item in transaction:
            item_set[int(item)] += 1
    
    file_len = len(dataset)

    res = apriori(item_set, MIN_SUPPORT, file_len, dataset)
    
    #print("num of freq. pat. : ", len(res))
    
    res_t = [element for array in res for element in array]
    res_tt = [set(x) for x in res_t]

    #print(len(res_tt))

    association_rule(MIN_SUPPORT, res_tt, OUTPUT_FILE, file_len, dataset)
    INPUT_FILE.close()
    print("time took : "+ str( time.time() - start)+" sec")  # 현재시각 - 시작시간 = 실행 시간

if __name__ == "__main__":
    main()