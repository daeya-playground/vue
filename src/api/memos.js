export async function getMemos({ status } = {}) {
  const qs = status ? `?status=${encodeURIComponent(status)}` : "";
  const res = await fetch(`/api/memos${qs}`);
  if (!res.ok) throw new Error(String(res.status));
  return await res.json();
}

export async function createMemo({ title, content, status }) {
  const res = await fetch("/api/memos", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ title, content, status }),
  });
  if (!res.ok) throw new Error(String(res.status));
}

export async function updateMemo(id, { title, content, status }) {
  const res = await fetch(`/api/memos/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ title, content, status }),
  });
  if (!res.ok) throw new Error(String(res.status));
}

export async function deleteMemo(id) {
  const res = await fetch(`/api/memos/${id}`, {
    method: "DELETE",
  });
  if (!res.ok) throw new Error(String(res.status));
}
