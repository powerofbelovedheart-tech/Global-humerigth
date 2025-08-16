form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const question = document.getElementById("aiQuestion").value;

  // Bruker-boble
  const userBubble = document.createElement("div");
  userBubble.className = "bg-emerald-50 p-3 rounded-xl self-end";
  userBubble.innerText = question;
  chat.appendChild(userBubble);

  // "AI skriver..." boble
  const typingBubble = document.createElement("div");
  typingBubble.className = "bg-gray-100 italic p-3 rounded-xl";
  typingBubble.innerText = "AI skriver …";
  chat.appendChild(typingBubble);

  chat.scrollTop = chat.scrollHeight;

  // Send til server
  const res = await fetch("/ask", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ question })
  });
  const data = await res.json();

  typingBubble.remove();

  // AI-boble
  const aiBubble = document.createElement("div");
  aiBubble.className = "bg-white border p-3 rounded-xl shadow";
  aiBubble.innerText = data.answer;
  chat.appendChild(aiBubble);

  chat.scrollTop = chat.scrollHeight;
});
