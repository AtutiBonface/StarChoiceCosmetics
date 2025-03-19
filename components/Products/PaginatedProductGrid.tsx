'use client'
import { Product } from "@/mockData";
import { ProductItem } from "./productItem";
import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface PaginatedProductGridProps {
  products: Product[];
  itemsPerPage?: number;
}

const PaginatedProductGrid: React.FC<PaginatedProductGridProps> = ({ 
  products,
  itemsPerPage = 12 
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  
  const totalPages = Math.ceil(products.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentProducts = products.slice(startIndex, endIndex);

  const handleAddToCart = (e: React.MouseEvent, productId: string) => {
    e.stopPropagation();
    console.log('Adding to cart:', productId);
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {currentProducts.map((product) => (
          <ProductItem
            key={product.id}
            product={product}
            handleAddToCart={handleAddToCart}
          />
        ))}
      </div>

      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-2">
          <button
            onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className="p-2 rounded-full hover:bg-gray-100 disabled:opacity-50"
          >
            <ChevronLeft size={20} />
          </button>
          
          {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
            <button
              key={page}
              onClick={() => setCurrentPage(page)}
              className={`w-8 h-8 rounded-full ${
                currentPage === page 
                  ? 'bg-accent-1 text-white' 
                  : 'hover:bg-gray-100'
              }`}
            >
              {page}
            </button>
          ))}

          <button
            onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
            className="p-2 rounded-full hover:bg-gray-100 disabled:opacity-50"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      )}
    </div>
  );
};

export default PaginatedProductGrid;
