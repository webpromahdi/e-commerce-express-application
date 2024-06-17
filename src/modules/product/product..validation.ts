import { z } from 'zod';

const variantValidationSchema = z.object({
  type: z.string().nonempty({ message: 'Variant type is required' }),
  value: z.string().nonempty({ message: 'Variant value is required' }),
});

const inventoryValidationSchema = z.object({
  quantity: z
    .number()
    .min(0, { message: 'Quantity must be a non-negative number' }),
  inStock: z
    .boolean()
    .refine((val) => val !== null, { message: 'InStock status is required' }),
});

const productValidationSchema = z.object({
  name: z.string().nonempty({ message: 'Product name is required' }),
  description: z
    .string()
    .nonempty({ message: 'Product description is required' }),
  price: z.number().min(0, { message: 'Price must be a non-negative number' }),
  category: z.string().nonempty({ message: 'Category is required' }),
  tags: z.array(z.string()).nonempty({ message: 'Tags array cannot be empty' }),
  variants: z
    .array(variantValidationSchema)
    .nonempty({ message: 'Variants array cannot be empty' }),
  inventory: inventoryValidationSchema,
});

export default productValidationSchema;
