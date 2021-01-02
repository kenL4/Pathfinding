from collections import deque

graph = [["O", " ", " ", "#", " "],
         ["#", " ", " ", "#", " "],
         ["X", "#", " ", " ", " "],
         [" ", " ", " ", "#", " "],
         [" ", " ", " ", "#", " "]]

# Used a hashmap here but we could save memory by just checking if it is a . to see if we have been there
# I will do this in the javascript version because tuples don't exist so I can't use a hashmap

def pathFindBFS(graph):
    startCoord = [0, 0]
    for i in range(len(graph)):
        for j in range(len(graph[i])):
            if graph[i][j] == "O":
                startCoord == [i, j] ## Coordinates look like [y, x]
    visited = {}
    queue = deque()
    queue.append([startCoord])
    path = []
    while queue:
        currentNode = queue.popleft()
        #if visited or a wall skip
        if visited.get((currentNode[-1][0], currentNode[-1][1])) or graph[currentNode[-1][0]][currentNode[-1][1]] == "#":
            continue
        visited[(currentNode[-1][0], currentNode[-1][1])] = 1
        if graph[currentNode[-1][0]][currentNode[-1][1]] == "X":
            path = currentNode
            break
        graph[currentNode[-1][0]][currentNode[-1][1]] = "."
        #Check for edge cases and add to queue
        hasleft = currentNode[-1][1] >= 1
        hasright = currentNode[-1][1] < len(graph[0]) - 1
        hasbottom = currentNode[-1][0] < len(graph) - 1
        hastop = currentNode[-1][0] >= 1
        #ew
        if hasleft:
            leftSide = currentNode + [[currentNode[-1][0], currentNode[-1][1] - 1]]
            queue.append(leftSide)
        if hasleft and hastop:
            topleftSide = currentNode + [[currentNode[-1][0] - 1, currentNode[-1][1] - 1]]
            queue.append(topleftSide)
        if hasleft and hasbottom:
            bottomleftSide = currentNode + [[currentNode[-1][0] + 1, currentNode[-1][1] - 1]]
            queue.append(bottomleftSide)
        if hasright:
            rightSide = currentNode + [[currentNode[-1][0], currentNode[-1][1] + 1]]
            queue.append(rightSide)
        if hasright and hastop:
            toprightSide = currentNode + [[currentNode[-1][0] - 1, currentNode[-1][1] + 1]]
            queue.append(topleftSide)
        if hasright and hasbottom:
            topleftSide = currentNode + [[currentNode[-1][0] + 1, currentNode[-1][1] + 1]]
            queue.append(topleftSide)
        if hasbottom:
            bottomSide = currentNode + [[currentNode[-1][0] + 1, currentNode[-1][1]]]
            queue.append(bottomSide)
        if hastop:
            topSide = currentNode + [[currentNode[-1][0] - 1, currentNode[-1][1]]]
            queue.append(topSide)
    for point in path:
        graph[point[0]][point[1]] = "+"
    return graph