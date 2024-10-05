# Megaverse Challenge

This project is a solution to the Megaverse Challenge, which consists of two parts: Challenge 1 and Challenge 2.

## Challenge 1

In this challenge, we create a simple pattern in the Megaverse using Polyanets. I thought the goal of the project was going to be to add a cross, and for the later tests we would add the Soloons and Comeths based on some limitations. Also assumed that the goal endpoint was for a support.

I may have overcomplicated it a little for this phase, although I didn't need to modify any previous code for the second challenge.

For this challenge I:
- Set up the API connection, and since I got throttled, I created a function that controls the number of calls to the API, by delaying it. Lastly, if there is an error, I retry it with an incremental delay (to prevent from breaking down your backend).
- Implemented the Polyanet class.
- Creating a function to generate the required pattern

I chose to add to the megaverse elements the function to save to the api to make the code more abstract when handling the logic in Megaverse.

## Challenge 2

This challenge was slightly simpler for me. Since I came to realize that I just had to copy the goal endpoint's output. For that:

- I implemented additional Megaverse elements (Soloons and Comeths) and their particularities.
- I created a dynamic Megaverse generator based on a goal map
- I optimized the API requests to handle larger Megaverse sizes (the incremental delay previously mentioned)
- Created an additional entity to validate the Megaverse, because you could have multiple sets of rules. So this could give further flexibility if we had more phases.
- Created a factory to generate elements from text.

If you have any further doubts, please let me know.