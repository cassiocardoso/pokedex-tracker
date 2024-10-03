export default function formatDate(date: Date) {
  if (!date) return null;

  return new Date(date).toLocaleDateString("pt-PT");
}
