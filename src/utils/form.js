export const formatCard = (card) => {
  let formatedCard = card
    .replace(/[a-zA-Z]/g, "")
    .replace(/ /g, "")
    .match(/.{1,4}/g);

  return (formatedCard || []).join(" ");
};

export const formatExpiry = (expiry) => {
  let formatedExpiry = expiry
    .replace(/[a-zA-Z]/g, "")
    .split("/")
    .join("");
  if (formatedExpiry.length <= 4 && formatedExpiry.length > 0)
    return formatedExpiry.match(/.{1,2}/g).join("/");
};

export const formatCVC = (CVC) => CVC.replace(/[a-zA-Z]/g, "");
