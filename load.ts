/* const [products, setProducts] = useState<Product[]>([]);
const [page, setPage] = useState(1);
const [loading, setLoading] = useState(false);
const [pageSize, setPageSize] = useState(6); // Default for mobile

// Function to determine the correct page size
const updatePageSize = () => {
  const width = window.innerWidth;
  if (width >= 1024) setPageSize(12); // Desktop (Large screens)
  else if (width >= 768) setPageSize(9); // Tablet
  else setPageSize(6); // Mobile
};

useEffect(() => {
  updatePageSize();
  window.addEventListener("resize", updatePageSize);
  return () => window.removeEventListener("resize", updatePageSize);
}, []);

const loadMoreItems = async () => {
  if (loading) return;
  setLoading(true);

  try {
    const response = await fetch(`/api/products?page=${page}&size=${pageSize}`);
    const newProducts = await response.json();

    setProducts((prev) => [...prev, ...newProducts]);
    setPage((prev) => prev + 1);
  } catch (error) {
    console.error("Error fetching products:", error);
  } finally {
    setLoading(false);
  }
};
 */