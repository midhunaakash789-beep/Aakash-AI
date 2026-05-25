async function sendMessage() {

  const input =
    document.getElementById("userInput");

  const chatbox =
    document.getElementById("chatbox");

  const userText =
    input.value;

  if(userText.trim() === ""){
    return;
  }

  chatbox.innerHTML += `
    <p><b>You:</b> ${userText}</p>
  `;

  input.value = "";

  const API_KEY =
    "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";

  try {

    const response = await fetch(

      "https://openrouter.ai/api/v1/chat/completions",

      {

        method: "POST",

        headers: {

          "Authorization":
            `Bearer ${API_KEY}`,

          "Content-Type":
            "application/json"

        },

        body: JSON.stringify({

          model:
            "deepseek/deepseek-chat",

          messages: [

            {
              role: "system",
              content:
                "You are Aakash AI."
            },

            {
              role: "user",
              content: userText
            }

          ]

        })

      }

    );

    const data =
      await response.json();

    console.log(data);

    const aiReply =
      data.choices[0]
      .message.content;

    chatbox.innerHTML += `
      <p><b>Aakash AI:</b> ${aiReply}</p>
    `;

  }

  catch(error){

    console.log(error);

    chatbox.innerHTML += `
      <p>Error connecting.</p>
    `;
  }

}