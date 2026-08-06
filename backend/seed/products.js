/**
 * ─────────────────────────────────────────────────────────────────
 *  PRODUCT SEED SCRIPT
 *  Run from the /backend directory:
 *    node seed/products.js
 *
 *  What it does:
 *   1. Connects to MongoDB using MONGODB_URI from .env
 *   2. Deletes ALL existing products  (clean slate)
 *   3. Inserts 25 dummy products with Unsplash image URLs
 *   4. Logs success / error and exits
 * ─────────────────────────────────────────────────────────────────
 *
 *  Schema (productModel):
 *   name        : String  (required)
 *   description : String  (required)
 *   price       : Number  (required)
 *   category    : String  (required)  → "Men" | "Women" | "Kids"
 *   subCategory : String  (required)  → "Topwear" | "Bottomwear" | "Winterwear" | "Footwear" | "Accessories" | "Ethnic"
 *   image       : Array   (required)  → array of image URL strings
 *   sizes       : Array   (required)  → e.g. ["S","M","L","XL"] or ["7","8","9"]
 *   date        : Number  (required)  → Date.now()
 *   bestseller  : Boolean
 * ─────────────────────────────────────────────────────────────────
 */

import mongoose from "mongoose";
import dotenv from "dotenv";
import productModel from "../models/productModel.js";

dotenv.config();

// ─── Connect ────────────────────────────────────────────────────
console.log("🔗  Connecting to MongoDB...");
await mongoose.connect(process.env.MONGODB_URI);
console.log("✅  Connected.\n");

// ─── Product Data ────────────────────────────────────────────────
const products = [
    // ── MEN – Topwear ──────────────────────────────────────────────
    {
        name: "Men Classic White Oxford Shirt",
        description: "A timeless white Oxford shirt crafted from premium 100% cotton. Features a button-down collar, chest pocket, and a tailored slim fit that works equally well for formal meetings or smart-casual outings.",
        price: 999,
        category: "Men",
        subCategory: "Topwear",
        image: [
            "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=600&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=600&auto=format&fit=crop",
        ],
        sizes: ["S", "M", "L", "XL", "XXL"],
        date: Date.now(),
        bestseller: true,
    },
    {
        name: "Men Slim Fit Polo T-Shirt",
        description: "Premium piqué cotton polo shirt with a classic three-button placket and ribbed collar. Breathable, durable, and versatile enough for both casual days and semi-formal occasions.",
        price: 749,
        category: "Men",
        subCategory: "Topwear",
        image: [
            "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=600&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600&auto=format&fit=crop",
        ],
        sizes: ["S", "M", "L", "XL"],
        date: Date.now(),
        bestseller: true,
    },
    {
        name: "Men Oversized Graphic Tee",
        description: "Relaxed-fit graphic tee made from soft 200 GSM cotton. Dropped shoulders and a boxy silhouette give this tee an effortlessly cool streetwear vibe.",
        price: 549,
        category: "Men",
        subCategory: "Topwear",
        image: [
            "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=600&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=600&auto=format&fit=crop",
        ],
        sizes: ["S", "M", "L", "XL", "XXL"],
        date: Date.now(),
        bestseller: false,
    },

    // ── MEN – Bottomwear ───────────────────────────────────────────
    {
        name: "Men Slim Fit Stretch Jeans",
        description: "Contemporary slim-fit jeans made from high-stretch denim for all-day comfort. Five-pocket styling, tapered leg, and a mid-rise waist make these the perfect everyday go-to.",
        price: 1499,
        category: "Men",
        subCategory: "Bottomwear",
        image: [
            "https://images.unsplash.com/photo-1542272604-787c3835535d?w=600&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1604176354204-9268737828e4?w=600&auto=format&fit=crop",
        ],
        sizes: ["30", "32", "34", "36", "38"],
        date: Date.now(),
        bestseller: true,
    },
    {
        name: "Men Cargo Trousers",
        description: "Functional multi-pocket cargo trousers in rugged ripstop fabric. Adjustable drawstring waist and ankle cuffs make them ideal for outdoor adventures or casual urban wear.",
        price: 1299,
        category: "Men",
        subCategory: "Bottomwear",
        image: [
            "https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=600&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=600&auto=format&fit=crop",
        ],
        sizes: ["30", "32", "34", "36"],
        date: Date.now(),
        bestseller: false,
    },

    // ── MEN – Winterwear ───────────────────────────────────────────
    {
        name: "Men Fleece Zip-Up Hoodie",
        description: "Ultra-soft fleece hoodie with a full-length zip, kangaroo pocket, and adjustable drawstring hood. Keeps you warm without the bulk — perfect for layering.",
        price: 1899,
        category: "Men",
        subCategory: "Winterwear",
        image: [
            "https://images.unsplash.com/photo-1523398002811-999ca8dec234?w=600&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?w=600&auto=format&fit=crop",
        ],
        sizes: ["S", "M", "L", "XL", "XXL"],
        date: Date.now(),
        bestseller: true,
    },
    {
        name: "Men Quilted Puffer Jacket",
        description: "Lightweight quilted puffer jacket with down-alternative fill. Water-resistant outer shell, ribbed cuffs, and interior zip pockets. Compresses into its own pocket for easy travel.",
        price: 3499,
        category: "Men",
        subCategory: "Winterwear",
        image: [
            "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=600&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1548126032-079a0fb0099d?w=600&auto=format&fit=crop",
        ],
        sizes: ["S", "M", "L", "XL"],
        date: Date.now(),
        bestseller: false,
    },

    // ── MEN – Footwear ─────────────────────────────────────────────
    {
        name: "Men Classic White Sneakers",
        description: "Minimalist leather-look sneakers with a cushioned EVA sole and clean white finish. Pairs with anything from jeans to chinos — the ultimate everyday shoe.",
        price: 2499,
        category: "Men",
        subCategory: "Footwear",
        image: [
            "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?w=600&auto=format&fit=crop",
        ],
        sizes: ["7", "8", "9", "10", "11"],
        date: Date.now(),
        bestseller: true,
    },
    {
        name: "Men Oxford Leather Formal Shoes",
        description: "Genuine leather Oxford shoes with a cap-toe brogue detail and cushioned footbed. Handcrafted for a refined finish that elevates any formal or business attire.",
        price: 3999,
        category: "Men",
        subCategory: "Footwear",
        image: [
            "https://images.unsplash.com/photo-1614252235316-8c857d38b5f4?w=600&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1605812860427-4024433a70fd?w=600&auto=format&fit=crop",
        ],
        sizes: ["7", "8", "9", "10"],
        date: Date.now(),
        bestseller: false,
    },

    // ── MEN – Accessories ──────────────────────────────────────────
    {
        name: "Men Chronograph Wrist Watch",
        description: "Stainless-steel chronograph watch with a sapphire-coated mineral glass face, 50m water resistance, and a genuine leather strap. Bold, precise, and built to impress.",
        price: 4999,
        category: "Men",
        subCategory: "Accessories",
        image: [
            "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1587836374828-4dbafa94cf0e?w=600&auto=format&fit=crop",
        ],
        sizes: ["Free Size"],
        date: Date.now(),
        bestseller: true,
    },
    {
        name: "Men Slim Leather Wallet",
        description: "Minimalist bifold wallet hand-stitched from full-grain leather. RFID-blocking inner layer, 6 card slots, and a bill compartment. Slim enough to fit comfortably in any pocket.",
        price: 899,
        category: "Men",
        subCategory: "Accessories",
        image: [
            "https://images.unsplash.com/photo-1627123424574-724758594e93?w=600&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1606760227091-3dd870d97f1d?w=600&auto=format&fit=crop",
        ],
        sizes: ["Free Size"],
        date: Date.now(),
        bestseller: false,
    },

    // ── WOMEN – Topwear ────────────────────────────────────────────
    {
        name: "Women Floral Wrap Blouse",
        description: "Flowy wrap blouse in a vibrant floral print, made from lightweight chiffon. V-neckline, waist-tie detail, and three-quarter sleeves — effortlessly feminine and versatile.",
        price: 899,
        category: "Women",
        subCategory: "Topwear",
        image: [
            "https://images.unsplash.com/photo-1564257631407-4deb1f99d992?w=600&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=600&auto=format&fit=crop",
        ],
        sizes: ["XS", "S", "M", "L", "XL"],
        date: Date.now(),
        bestseller: true,
    },
    {
        name: "Women Off-Shoulder Maxi Dress",
        description: "Elegant off-shoulder maxi dress in a soft jersey fabric with a fitted bodice and flared skirt. Perfect for beach holidays, summer parties, or date nights.",
        price: 1799,
        category: "Women",
        subCategory: "Topwear",
        image: [
            "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=600&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=600&auto=format&fit=crop",
        ],
        sizes: ["XS", "S", "M", "L"],
        date: Date.now(),
        bestseller: true,
    },
    {
        name: "Women Cotton Printed Kurti",
        description: "Hand-block printed cotton kurti with a mandarin collar and side slits. Breathable, comfortable, and perfect for everyday Indian ethnic wear or festive occasions.",
        price: 799,
        category: "Women",
        subCategory: "Topwear",
        image: [
            "https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=600&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1583744946564-b52ac1c389c8?w=600&auto=format&fit=crop",
        ],
        sizes: ["S", "M", "L", "XL"],
        date: Date.now(),
        bestseller: false,
    },

    // ── WOMEN – Bottomwear ─────────────────────────────────────────
    {
        name: "Women High-Rise Skinny Jeans",
        description: "High-waisted skinny jeans crafted from premium stretch denim for a second-skin fit. Sculpts the silhouette while ensuring maximum comfort throughout the day.",
        price: 1399,
        category: "Women",
        subCategory: "Bottomwear",
        image: [
            "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=600&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1584370848010-d7fe6bc767ec?w=600&auto=format&fit=crop",
        ],
        sizes: ["26", "28", "30", "32", "34"],
        date: Date.now(),
        bestseller: true,
    },
    {
        name: "Women Pleated Midi Skirt",
        description: "Graceful pleated midi skirt in a satin-finish fabric that catches the light beautifully. Elasticated waistband for a comfortable fit. Pairs well with tucked blouses or crop tops.",
        price: 1099,
        category: "Women",
        subCategory: "Bottomwear",
        image: [
            "https://images.unsplash.com/photo-1583496661160-fb5886a0aaaa?w=600&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1577900232427-18219b9166a0?w=600&auto=format&fit=crop",
        ],
        sizes: ["XS", "S", "M", "L", "XL"],
        date: Date.now(),
        bestseller: false,
    },

    // ── WOMEN – Winterwear ─────────────────────────────────────────
    {
        name: "Women Oversized Knit Sweater",
        description: "Cosy chunky-knit sweater with a relaxed fit, ribbed hem, and crew neck. Made from a soft wool-acrylic blend that keeps you warm without scratching. A wardrobe staple.",
        price: 1599,
        category: "Women",
        subCategory: "Winterwear",
        image: [
            "https://images.unsplash.com/photo-1604695573706-53170668f6a6?w=600&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=600&auto=format&fit=crop",
        ],
        sizes: ["S", "M", "L", "XL"],
        date: Date.now(),
        bestseller: true,
    },

    // ── WOMEN – Ethnic ─────────────────────────────────────────────
    {
        name: "Women Banarasi Silk Saree",
        description: "Exquisite Banarasi silk saree featuring intricate zari weave motifs and a rich golden border. Comes with a matching unstitched blouse piece. Ideal for weddings and festivities.",
        price: 3499,
        category: "Women",
        subCategory: "Ethnic",
        image: [
            "https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=600&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1583744946564-b52ac1c389c8?w=600&auto=format&fit=crop",
        ],
        sizes: ["Free Size"],
        date: Date.now(),
        bestseller: false,
    },

    // ── WOMEN – Footwear ───────────────────────────────────────────
    {
        name: "Women Block Heel Sandals",
        description: "Elegant strappy sandals with a stable 4-inch block heel and cushioned footbed. The adjustable ankle strap ensures a secure fit. Goes perfectly from brunch to evening events.",
        price: 1999,
        category: "Women",
        subCategory: "Footwear",
        image: [
            "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=600&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1515347619252-60a4bf4fff4f?w=600&auto=format&fit=crop",
        ],
        sizes: ["5", "6", "7", "8"],
        date: Date.now(),
        bestseller: true,
    },

    // ── WOMEN – Accessories ────────────────────────────────────────
    {
        name: "Women Structured Tote Bag",
        description: "Sophisticated structured tote in premium vegan leather. Spacious interior with a zip pocket and two slip pockets. Magnetic snap closure and detachable shoulder strap.",
        price: 2299,
        category: "Women",
        subCategory: "Accessories",
        image: [
            "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=600&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=600&auto=format&fit=crop",
        ],
        sizes: ["Free Size"],
        date: Date.now(),
        bestseller: true,
    },

    // ── KIDS – Topwear ─────────────────────────────────────────────
    {
        name: "Kids Dinosaur Print T-Shirt",
        description: "Fun and colourful dinosaur print tee made from 100% soft cotton. Tagless neck label for extra comfort. Machine washable and built to survive playground adventures.",
        price: 449,
        category: "Kids",
        subCategory: "Topwear",
        image: [
            "https://images.unsplash.com/photo-1622290291468-a28f7a7dc6a8?w=600&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?w=600&auto=format&fit=crop",
        ],
        sizes: ["3-4Y", "5-6Y", "7-8Y", "9-10Y"],
        date: Date.now(),
        bestseller: true,
    },
    {
        name: "Kids Hooded Sweatshirt",
        description: "Warm fleece-lined hooded sweatshirt with kangaroo pocket and contrast drawstrings. Made from a soft cotton-polyester blend — great for school, play, or chilly evenings.",
        price: 899,
        category: "Kids",
        subCategory: "Topwear",
        image: [
            "https://images.unsplash.com/photo-1503944583220-79d8926ad5e2?w=600&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1519278409-1f56fdda7fe5?w=600&auto=format&fit=crop",
        ],
        sizes: ["3-4Y", "5-6Y", "7-8Y", "9-10Y", "11-12Y"],
        date: Date.now(),
        bestseller: false,
    },

    // ── KIDS – Bottomwear ──────────────────────────────────────────
    {
        name: "Kids Elastic Waist Jogger Pants",
        description: "Comfortable stretch joggers with an elasticated waistband, cuffed ankles, and two side pockets. Soft French terry fabric that lets kids move freely all day long.",
        price: 649,
        category: "Kids",
        subCategory: "Bottomwear",
        image: [
            "https://images.unsplash.com/photo-1519457431-44ccd64a579b?w=600&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1591195853828-11db59a44f43?w=600&auto=format&fit=crop",
        ],
        sizes: ["3-4Y", "5-6Y", "7-8Y", "9-10Y"],
        date: Date.now(),
        bestseller: false,
    },

    // ── KIDS – Winterwear ──────────────────────────────────────────
    {
        name: "Kids Puffer Jacket with Hood",
        description: "Lightweight yet super-warm kids' puffer jacket with a detachable hood, two-way zip, and reflective piping for safety. Shell is water-repellent and wind-resistant.",
        price: 1499,
        category: "Kids",
        subCategory: "Winterwear",
        image: [
            "https://images.unsplash.com/photo-1471286174890-9c112ffca5b4?w=600&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1514990035372-1f5d923bc500?w=600&auto=format&fit=crop",
        ],
        sizes: ["3-4Y", "5-6Y", "7-8Y", "9-10Y", "11-12Y"],
        date: Date.now(),
        bestseller: true,
    },

    // ── KIDS – Accessories ─────────────────────────────────────────
    {
        name: "Kids Cartoon School Backpack",
        description: "Sturdy and spacious 20L school backpack with an ergonomic padded back panel and shoulder straps. Multiple compartments including a water-bottle side pocket and front zipper pouch.",
        price: 999,
        category: "Kids",
        subCategory: "Accessories",
        image: [
            "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1622560480605-d83c853bc5c3?w=600&auto=format&fit=crop",
        ],
        sizes: ["Free Size"],
        date: Date.now(),
        bestseller: true,
    },

    // ═══════════════════════════════════════════════════════════════
    //  BATCH 2 — 25 MORE PRODUCTS (Total: 50)
    // ═══════════════════════════════════════════════════════════════

    // ── MEN – Extra Topwear
    {
        name: "Men Graphic Crew-Neck Sweatshirt",
        description: "Premium French-terry cotton sweatshirt with a bold graphic print. Ribbed crew neck, cuffs and hem. Great for casual outings and weekend style.",
        price: 1199,
        category: "Men",
        subCategory: "Topwear",
        image: ["https://images.unsplash.com/photo-1578768079052-aa76e52ff574?w=600&auto=format&fit=crop","https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=600&auto=format&fit=crop"],
        sizes: ["S", "M", "L", "XL", "XXL"],
        date: Date.now(),
        bestseller: false,
    },
    {
        name: "Men Linen Casual Shirt",
        description: "Lightweight summer linen shirt with a relaxed fit and spread collar. Breathable fabric keeps you cool all day — perfect for casual Fridays.",
        price: 1349,
        category: "Men",
        subCategory: "Topwear",
        image: ["https://images.unsplash.com/photo-1607345366928-199ea26cfe3e?w=600&auto=format&fit=crop","https://images.unsplash.com/photo-1604695573706-53170668f6a6?w=600&auto=format&fit=crop"],
        sizes: ["S", "M", "L", "XL"],
        date: Date.now(),
        bestseller: true,
    },

    // ── MEN – Extra Bottomwear
    {
        name: "Men Slim Chino Pants",
        description: "Tailored slim-fit chinos in stretch cotton-blend. Flat front, side pockets, clean ankle length. Easy to dress up or down.",
        price: 1499,
        category: "Men",
        subCategory: "Bottomwear",
        image: ["https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=600&auto=format&fit=crop","https://images.unsplash.com/photo-1542272604-787c3835535d?w=600&auto=format&fit=crop"],
        sizes: ["S", "M", "L", "XL", "XXL"],
        date: Date.now(),
        bestseller: false,
    },
    {
        name: "Men Jogger Track Pants",
        description: "Comfortable jogger pants with elasticated waistband. Soft fleece with tapered legs — great for gym or lounging.",
        price: 899,
        category: "Men",
        subCategory: "Bottomwear",
        image: ["https://images.unsplash.com/photo-1552902865-b72c031ac5ea?w=600&auto=format&fit=crop","https://images.unsplash.com/photo-1556906781-9a412961a28c?w=600&auto=format&fit=crop"],
        sizes: ["S", "M", "L", "XL"],
        date: Date.now(),
        bestseller: false,
    },

    // ── MEN – Winterwear (winter-themed images)
    {
        name: "Men Heavy Puffer Jacket",
        description: "Heavyweight puffer jacket with premium down filling, windproof outer shell, and secure zip-up front. The ultimate winter essential.",
        price: 3499,
        category: "Men",
        subCategory: "Winterwear",
        image: ["https://images.unsplash.com/photo-1548883354-94bcfe321cbb?w=600&auto=format&fit=crop","https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=600&auto=format&fit=crop"],
        sizes: ["S", "M", "L", "XL", "XXL"],
        date: Date.now(),
        bestseller: true,
    },
    {
        name: "Men Merino Wool Crew Sweater",
        description: "Luxuriously soft merino wool sweater with classic crew neck. Naturally temperature-regulating — keeps you warm without bulk.",
        price: 2199,
        category: "Men",
        subCategory: "Winterwear",
        image: ["https://images.unsplash.com/photo-1608234807905-4466023792f5?w=600&auto=format&fit=crop","https://images.unsplash.com/photo-1520975922014-2f55e93aefba?w=600&auto=format&fit=crop"],
        sizes: ["S", "M", "L", "XL"],
        date: Date.now(),
        bestseller: false,
    },

    // ── MEN – Accessories
    {
        name: "Men Canvas Laptop Backpack",
        description: "Rugged canvas backpack with padded laptop compartment (up to 15in), multiple organizer pockets, and adjustable padded straps.",
        price: 1799,
        category: "Men",
        subCategory: "Accessories",
        image: ["https://images.unsplash.com/photo-1491637639811-60e2756cc1c7?w=600&auto=format&fit=crop","https://images.unsplash.com/photo-1622560480605-d83c853bc5c3?w=600&auto=format&fit=crop"],
        sizes: ["Free Size"],
        date: Date.now(),
        bestseller: false,
    },

    // ── MEN – Footwear
    {
        name: "Men Leather Derby Shoes",
        description: "Classic Derby shoes in genuine leather with cushioned insole and rubber sole. Perfect for formal occasions.",
        price: 2799,
        category: "Men",
        subCategory: "Footwear",
        image: ["https://images.unsplash.com/photo-1510771463146-e89e6e86560e?w=600&auto=format&fit=crop","https://images.unsplash.com/photo-1449505278894-297fdb3edbc1?w=600&auto=format&fit=crop"],
        sizes: ["7", "8", "9", "10", "11"],
        date: Date.now(),
        bestseller: false,
    },
    {
        name: "Men Running Sneakers",
        description: "Engineered mesh running shoes with responsive foam midsole and grippy rubber outsole. Lightweight for gym or street style.",
        price: 1999,
        category: "Men",
        subCategory: "Footwear",
        image: ["https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&auto=format&fit=crop","https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?w=600&auto=format&fit=crop"],
        sizes: ["7", "8", "9", "10", "11"],
        date: Date.now(),
        bestseller: true,
    },

    // ── WOMEN – Extra Topwear
    {
        name: "Women Structured Blazer Jacket",
        description: "Sharp blazer in fine bengaline fabric. Notched lapels, functional pockets, and single-button closure — polished and boardroom-ready.",
        price: 2499,
        category: "Women",
        subCategory: "Topwear",
        image: ["https://images.unsplash.com/photo-1548142813-c348350df52b?w=600&auto=format&fit=crop","https://images.unsplash.com/photo-1552664688-cf412ec27db2?w=600&auto=format&fit=crop"],
        sizes: ["XS", "S", "M", "L", "XL"],
        date: Date.now(),
        bestseller: true,
    },
    {
        name: "Women Crop Fleece Hoodie",
        description: "Trendy oversized crop hoodie in soft fleece. Kangaroo pocket, adjustable hood, and relaxed fit. Perfect for layering.",
        price: 999,
        category: "Women",
        subCategory: "Topwear",
        image: ["https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=600&auto=format&fit=crop","https://images.unsplash.com/photo-1556821840-3a63f15732ce?w=600&auto=format&fit=crop"],
        sizes: ["XS", "S", "M", "L"],
        date: Date.now(),
        bestseller: false,
    },

    // ── WOMEN – Extra Bottomwear
    {
        name: "Women Floral Midi Skirt",
        description: "Flowy A-line midi skirt in lightweight chiffon with floral print. Elasticated waistband — perfect for brunches and casual outings.",
        price: 1099,
        category: "Women",
        subCategory: "Bottomwear",
        image: ["https://images.unsplash.com/photo-1583496661160-fb5886a0aaaa?w=600&auto=format&fit=crop","https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=600&auto=format&fit=crop"],
        sizes: ["XS", "S", "M", "L", "XL"],
        date: Date.now(),
        bestseller: true,
    },
    {
        name: "Women High-Waist Palazzo Pants",
        description: "Wide-leg palazzo pants with high-waist silhouette and side slits. Breathable rayon fabric — great for formal and casual settings.",
        price: 1249,
        category: "Women",
        subCategory: "Bottomwear",
        image: ["https://images.unsplash.com/photo-1594938298603-c8148c4b4156?w=600&auto=format&fit=crop","https://images.unsplash.com/photo-1604176424472-17cd43dd3b85?w=600&auto=format&fit=crop"],
        sizes: ["XS", "S", "M", "L"],
        date: Date.now(),
        bestseller: false,
    },

    // ── WOMEN – Winterwear (winter-themed images)
    {
        name: "Women Long Winter Parka Coat",
        description: "Premium long parka with faux-fur trim hood. Water-resistant outer shell with warm quilted lining. A must-have for cold winter days.",
        price: 4299,
        category: "Women",
        subCategory: "Winterwear",
        image: ["https://images.unsplash.com/photo-1544022613-e87ca75a784a?w=600&auto=format&fit=crop","https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=600&auto=format&fit=crop"],
        sizes: ["XS", "S", "M", "L", "XL"],
        date: Date.now(),
        bestseller: true,
    },
    {
        name: "Women Cable Knit Turtleneck Sweater",
        description: "Classic cable-knit turtleneck in soft chunky yarn. Ribbed neck for extra warmth. Relaxed-fit silhouette perfect for winter layering.",
        price: 1799,
        category: "Women",
        subCategory: "Winterwear",
        image: ["https://images.unsplash.com/photo-1601924921557-45e6dea0a157?w=600&auto=format&fit=crop","https://images.unsplash.com/photo-1512327536842-5aa37d1ba3e3?w=600&auto=format&fit=crop"],
        sizes: ["XS", "S", "M", "L"],
        date: Date.now(),
        bestseller: false,
    },

    // ── WOMEN – Ethnic
    {
        name: "Women Embroidered Anarkali Suit",
        description: "Elegant Anarkali kurta with intricate floral embroidery. Comes with matching palazzo pants and dupatta in premium georgette fabric.",
        price: 2999,
        category: "Women",
        subCategory: "Ethnic",
        image: ["https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=600&auto=format&fit=crop","https://images.unsplash.com/photo-1618085220035-5da19aca1884?w=600&auto=format&fit=crop"],
        sizes: ["XS", "S", "M", "L", "XL"],
        date: Date.now(),
        bestseller: true,
    },

    // ── WOMEN – Footwear
    {
        name: "Women Block Heel Sandals",
        description: "Chic block-heel sandals with open-toe design and adjustable ankle strap. Stable chunky heel for all-day comfort.",
        price: 1599,
        category: "Women",
        subCategory: "Footwear",
        image: ["https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=600&auto=format&fit=crop","https://images.unsplash.com/photo-1515347619252-60a4bf4fff4f?w=600&auto=format&fit=crop"],
        sizes: ["5", "6", "7", "8", "9"],
        date: Date.now(),
        bestseller: false,
    },

    // ── KIDS – Extra Topwear
    {
        name: "Kids Superhero Hoodie",
        description: "Fun superhero-themed hoodie with bold graphic print. Soft fleece interior, kangaroo pocket, and adjustable drawstring hood.",
        price: 699,
        category: "Kids",
        subCategory: "Topwear",
        image: ["https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?w=600&auto=format&fit=crop","https://images.unsplash.com/photo-1522771930-78848d9293e8?w=600&auto=format&fit=crop"],
        sizes: ["S", "M", "L"],
        date: Date.now(),
        bestseller: true,
    },
    {
        name: "Kids Sports Training Jersey",
        description: "Breathable moisture-wicking sports jersey with mesh panels. Ideal for football, cricket, or any active sport.",
        price: 549,
        category: "Kids",
        subCategory: "Topwear",
        image: ["https://images.unsplash.com/photo-1503944583220-79d8926ad5e2?w=600&auto=format&fit=crop","https://images.unsplash.com/photo-1560272564-c83b66b1ad12?w=600&auto=format&fit=crop"],
        sizes: ["S", "M", "L"],
        date: Date.now(),
        bestseller: false,
    },

    // ── KIDS – Extra Bottomwear
    {
        name: "Kids Denim Dungaree",
        description: "Classic denim dungaree with adjustable straps and multiple pockets. Soft stretch denim for complete freedom of movement.",
        price: 899,
        category: "Kids",
        subCategory: "Bottomwear",
        image: ["https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?w=600&auto=format&fit=crop","https://images.unsplash.com/photo-1544816155-12df9643f363?w=600&auto=format&fit=crop"],
        sizes: ["S", "M", "L"],
        date: Date.now(),
        bestseller: false,
    },

    // ── KIDS – Winterwear (winter-themed images)
    {
        name: "Kids Fleece Zip-Up Jacket",
        description: "Cosy anti-pill fleece jacket with full zip-up front and zip pockets. Lightweight yet warm — perfect as a standalone winter layer.",
        price: 999,
        category: "Kids",
        subCategory: "Winterwear",
        image: ["https://images.unsplash.com/photo-1602712006658-4ec4f8ca5b7e?w=600&auto=format&fit=crop","https://images.unsplash.com/photo-1574680178050-55c6a6a96e0a?w=600&auto=format&fit=crop"],
        sizes: ["S", "M", "L"],
        date: Date.now(),
        bestseller: true,
    },
    {
        name: "Kids Puffer Vest Jacket",
        description: "Sleeveless puffer vest with synthetic down filling. Lightweight and compressible — perfect for cool evenings. Machine washable.",
        price: 1199,
        category: "Kids",
        subCategory: "Winterwear",
        image: ["https://images.unsplash.com/photo-1543736173-0dc57be4cdde?w=600&auto=format&fit=crop","https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=600&auto=format&fit=crop"],
        sizes: ["S", "M", "L"],
        date: Date.now(),
        bestseller: false,
    },
    {
        name: "Kids Waterproof Rain Jacket",
        description: "Brightly coloured waterproof jacket with sealed hood, taped seams, and reflective strips. Packable design — a must for monsoon season.",
        price: 1499,
        category: "Kids",
        subCategory: "Winterwear",
        image: ["https://images.unsplash.com/photo-1583846783214-7229a91b20ed?w=600&auto=format&fit=crop","https://images.unsplash.com/photo-1548883354-94bcfe321cbb?w=600&auto=format&fit=crop"],
        sizes: ["S", "M", "L"],
        date: Date.now(),
        bestseller: false,
    },

    // ── KIDS – Footwear
    {
        name: "Kids Canvas Velcro Sneakers",
        description: "Colourful canvas sneakers with easy velcro fastening. Cushioned insole and non-slip rubber outsole for safe, comfortable play.",
        price: 799,
        category: "Kids",
        subCategory: "Footwear",
        image: ["https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&auto=format&fit=crop","https://images.unsplash.com/photo-1549298916-b41d501d3772?w=600&auto=format&fit=crop"],
        sizes: ["3", "4", "5", "6"],
        date: Date.now(),
        bestseller: true,
    },];

// ─── Seed// ─── Seed ────────────────────────────────────────────────────────
try {
    console.log("🗑️   Clearing existing products...");
    await productModel.deleteMany({});

    console.log(`📦  Inserting ${products.length} products...`);
    const inserted = await productModel.insertMany(products);

    console.log(`\n✅  SUCCESS — ${inserted.length} products added to the database.\n`);
    inserted.forEach((p, i) =>
        console.log(`   ${String(i + 1).padStart(2, "0")}. [${p.category} / ${p.subCategory}] ${p.name}  —  ₹${p.price}`)
    );

    await mongoose.disconnect();
    process.exit(0);
} catch (err) {
    console.error("\n❌  SEED FAILED:", err.message);
    await mongoose.disconnect();
    process.exit(1);
}