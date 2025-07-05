export const deleteVocalist = async (id: string) => {
  try {
    const res = await fetch(`/api/vocalists?id=${id}`, {
      method: "DELETE",
    });

    if (!res.ok) {
      throw new Error("Failed to delete vocalist");
    }

    return await res.json(); // Optionally return the response
  } catch (err) {
    console.error("Delete error:", err);
    throw err;
  }
};
