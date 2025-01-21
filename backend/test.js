// const prompt="Who is at risk for Glaucoma ?"
// async function getResponse(prompt) {
//     try {
//         const response = await fetch("http://localhost:5000/generate", {
//             method: "POST",
//             headers: {
//                 "Content-Type": "application/json",
//             },
//             body: JSON.stringify({ prompt }),
//         });

//         if (!response.ok) {
//             throw new Error("Error generating response");
//         }

//         const data = await response.json();
//         console.log("Generated Response:", data.response);
//         return data.response;
//     } catch (error) {
//         console.error("Error:", error);
//     }
// }
// getResponse(prompt)


function splitString(inputString) {
    if (inputString.includes('[/INST]')) {
        return inputString.split('[/INST]');
    } else if (inputString.includes('[/]')) {
        return inputString.split('[/]');
    } else {
        return [inputString];  // Return the original string as an array
    }
}

// Test examples
const testString1 = "part1 [/INST] part2 [/INST] part3";
const testString2 = "part1[/]part2[/]part3";
const testString3 = "no_split_here";

console.log(splitString(testString1));  // ['part1', 'part2', 'part3']
console.log(splitString(testString2));  // ['part1', 'part2', 'part3']
console.log(splitString(testString3));