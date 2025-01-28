export const handleFormSubmit = async ({
  event,
  url,
  data,
  setLoading,
  navigate,
}) => {
  event.preventDefault();
  setLoading(true);

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const result = await response.json();
    setLoading(false);

    if (response.ok) {
      const userInfo = result.user?.firstName;
      // const userDetails = result
      console.log(result);
      localStorage.setItem("authToken", result.token);
      localStorage.setItem("userInfo", userInfo);
      localStorage.setItem("userDetails", JSON.stringify(result));

      // Emit custom events
      window.dispatchEvent(new Event("storageUpdate"));
      window.dispatchEvent(new Event("storage"));
      window.location.reload()
      if (result.user.role === "admin") {
        navigate("/admin");
      }
      if (result.user.role === "user") {
        navigate("/");
        window.location.reload()
      }
    } else {
      console.error("Error:", result);
      alert("Request failed! Please check your credentials or input.");
    }
  } catch (error) {
    console.error("Error:", error);
    alert("An error occurred. Please try again.");
    setLoading(false);
  }
};
