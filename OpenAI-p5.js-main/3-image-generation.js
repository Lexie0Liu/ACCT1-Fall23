const API_KEY = "YOUR_KEY_HERE";
const UNSPLASH_ACCESS_KEY = "ACCESS_KEY_HERE";

let generateButton = document.getElementById("start");
let promptInput = document.getElementById("keywordInput");
let outputImage = document.getElementById("aiImage");
let unsplashImage = document.getElementById("unsplashImage");
let comparisonText = document.getElementById("comparisonText");
let loading = document.getElementById("loading"); // 获取加载提示元素

// Fetch Unsplash image and description
function fetchUnsplashImage(keyword) {
  return fetch(`https://api.unsplash.com/search/photos?query=${keyword}&client_id=${UNSPLASH_ACCESS_KEY}`)
    .then(response => {
      if (!response.ok) {
        throw new Error("Failed to fetch Unsplash image.");
      }
      return response.json();
    })
    .then(data => {
      if (data.results && data.results[0]) {
        const unsplashUrl = `${data.results[0].urls.raw}&w=1024&h=1024`; // 强制调整尺寸
        const description = data.results[0].alt_description || "a visual representation";
        console.log("Unsplash image URL:", unsplashUrl);
        unsplashImage.src = unsplashUrl; // 显示 Unsplash 图片
        return description; // 返回图片描述
      } else {
        unsplashImage.src = ""; // 清空图片
        return "No image found for this keyword on Unsplash.";
      }
    })
    .catch(error => {
      console.error("Error fetching Unsplash image:", error);
      unsplashImage.src = ""; // 清空图片
      return "Error fetching Unsplash image.";
    });
}

// Generate AI image and return description
function generateAIImage(keyword) {
  const payload = {
    model: "dall-e-3",
    prompt: keyword,
    n: 1,
    size: "1024x1024"
  };

  loading.style.display = "block";
  outputImage.src = ""; // 清空图片

  return fetch('https://api.openai.com/v1/images/generations', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${API_KEY}`
    },
    body: JSON.stringify(payload)
  })
    .then(response => {
      if (!response.ok) {
        throw new Error("Failed to fetch AI-generated image.");
      }
      return response.json();
    })
    .then(data => {
      if (data.data && data.data[0]) {
        const imageUrl = data.data[0].url;
        console.log("Generated AI Image URL:", imageUrl);
        outputImage.src = imageUrl; // 显示 AI 图片
        return `The AI-generated image creatively interprets "${keyword}" with elements inspired by the input prompt.`;
      } else {
        throw new Error("Unexpected response format.");
      }
    })
    .catch(error => {
      console.error("Error generating AI image:", error);
      return "Error generating AI image.";
    })
    .finally(() => {
      loading.style.display = "none"; // 隐藏加载提示
    });
}

// Generate detailed comparison using OpenAI
function generateDetailedComparison(unsplashDescription, aiDescription, keyword) {
  const prompt = `
    Compare these two images based on the keyword "${keyword}":
    - Unsplash Description: "${unsplashDescription}"
    - AI-Generated Description: "${aiDescription}"
    Write a detailed comparison that highlights differences in style, focus, and creativity.
  `;

  const payload = {
    model: "gpt-3.5-turbo",
    messages: [
      { role: "system", content: "You are a helpful assistant generating detailed image comparisons." },
      { role: "user", content: prompt }
    ],
    temperature: 0.7,
    max_tokens: 150
  };

  return fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${API_KEY}`
    },
    body: JSON.stringify(payload)
  })
    .then(response => {
      if (!response.ok) {
        throw new Error("Failed to generate comparison text.");
      }
      return response.json();
    })
    .then(data => {
      if (data.choices && data.choices[0].message) {
        return data.choices[0].message.content.trim(); // 返回详细比较文本
      } else {
        throw new Error("Unexpected response format.");
      }
    })
    .catch(error => {
      console.error("Error generating comparison text:", error);
      return "Error generating comparison text.";
    });
}

// Main function to handle the entire process
function generateImagesAndCompare() {
  const keyword = promptInput.value.trim();

  if (!keyword) {
    alert("Please enter a keyword.");
    return;
  }

  console.log("Generating images and fetching descriptions...");

  Promise.all([fetchUnsplashImage(keyword), generateAIImage(keyword)])
    .then(([unsplashDescription, aiDescription]) => {
      return generateDetailedComparison(unsplashDescription, aiDescription, keyword); // 调用 GPT 比较
    })
    .then(detailedComparison => {
      comparisonText.textContent = detailedComparison; // 更新比较内容
    })
    .catch(error => {
      comparisonText.textContent = "Failed to fetch one or both images or generate comparison. Check console for details.";
    });
}

generateButton.addEventListener("click", generateImagesAndCompare);
