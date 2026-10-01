import React, { useState } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import Animated, { FadeInDown, FadeInUp } from 'react-native-reanimated';
import { NEON_YELLOW, WHITE } from '../../constants/colors';

interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  originalPrice?: number;
  tag?: string;
  image: string;
  rating: string;
  time: string;
}

const CATEGORIES = [
  { id: 'all', name: '🔥 All Items' },
  { id: 'mixers', name: '🍸 Mixers & Soda' },
  { id: 'snacks', name: '🍿 Munchies' },
  { id: 'ice', name: '🧊 Ice & Coolers' },
  { id: 'props', name: '🃏 Party Props' },
  { id: 'combos', name: '⚡ VIP Bundles' },
];

const PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'The Weekend Rager Bundle',
    category: 'combos',
    price: 899,
    originalPrice: 1199,
    tag: 'BESTSELLER',
    image: '⚡',
    rating: '4.9 ★',
    time: '12 mins',
  },
  {
    id: '2',
    name: 'Cryo-Crystal Ice Bucket (5kg)',
    category: 'ice',
    price: 199,
    tag: 'EXTRA COLD',
    image: '🧊',
    rating: '4.8 ★',
    time: '10 mins',
  },
  {
    id: '3',
    name: 'Artisanal Tonic & Soda Pack (4x)',
    category: 'mixers',
    price: 349,
    originalPrice: 420,
    tag: 'PREMIUM',
    image: '🍸',
    rating: '4.7 ★',
    time: '15 mins',
  },
  {
    id: '4',
    name: 'Midnight Nachos & Cheese Dip',
    category: 'snacks',
    price: 249,
    tag: 'HOT & CRISPY',
    image: '🍿',
    rating: '4.9 ★',
    time: '14 mins',
  },
  {
    id: '5',
    name: 'Glow in Dark Beer Pong Kit',
    category: 'props',
    price: 499,
    originalPrice: 699,
    tag: 'PARTY ESSENTIAL',
    image: '🎮',
    rating: '5.0 ★',
    time: '15 mins',
  },
  {
    id: '6',
    name: 'Red Bull Energy Pack (6 Can)',
    category: 'mixers',
    price: 749,
    tag: 'ZERO DEPOSIT',
    image: '⚡',
    rating: '4.9 ★',
    time: '10 mins',
  },
];

interface HomeStoreStepProps {
  locationAddress?: string;
}

export const HomeStoreStep: React.FC<HomeStoreStepProps> = ({
  locationAddress = 'Indiranagar, Bengaluru',
}) => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [cartCount, setCartCount] = useState(0);
  const [cartTotal, setCartTotal] = useState(0);

  const filteredProducts =
    selectedCategory === 'all'
      ? PRODUCTS
      : PRODUCTS.filter((p) => p.category === selectedCategory);

  const handleAddToCart = (price: number) => {
    setCartCount((prev) => prev + 1);
    setCartTotal((prev) => prev + price);
  };

  return (
    <View style={styles.container}>
      {/* Top Fixed Header */}
      <Animated.View entering={FadeInDown.duration(600)} style={styles.topBar}>
        <View style={styles.locationContainer}>
          <Text style={styles.locationLabel}>DELIVERING TO ⚡ 10 MINS</Text>
          <View style={styles.locationPill}>
            <Text style={styles.locationIcon}>📍</Text>
            <Text style={styles.locationText} numberOfLines={1}>
              {locationAddress}
            </Text>
            <Text style={styles.locationArrow}>▼</Text>
          </View>
        </View>

        <TouchableOpacity style={styles.profileBadge}>
          <Text style={styles.profileBadgeText}>VIP</Text>
        </TouchableOpacity>
      </Animated.View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Search Bar */}
        <Animated.View entering={FadeInUp.duration(500).delay(100)} style={styles.searchBox}>
          <Text style={styles.searchIcon}>🔍</Text>
          <TextInput
            placeholder="Search mixers, ice, snacks, games..."
            placeholderTextColor="rgba(255,255,255,0.4)"
            style={styles.searchInput}
          />
        </Animated.View>

        {/* Hero Promo Banner */}
        <Animated.View entering={FadeInUp.duration(600).delay(200)} style={styles.promoBanner}>
          <View style={styles.bannerContent}>
            <View style={styles.liveBadge}>
              <View style={styles.liveDot} />
              <Text style={styles.liveText}>OPEN 24/7 • NIGHTLIFE STORE</Text>
            </View>
            <Text style={styles.bannerTitle}>AFTER HOURS PARTY STORE</Text>
            <Text style={styles.bannerSubtitle}>
              Curated mixers, ice & munchies delivered in <Text style={styles.highlightText}>10-15 mins</Text>
            </Text>
            <View style={styles.offerTag}>
              <Text style={styles.offerTagText}>🎉 20% OFF CODE: PARTYVIP</Text>
            </View>
          </View>
        </Animated.View>

        {/* Categories Bar */}
        <View style={styles.categorySection}>
          <Text style={styles.sectionTitle}>Categories</Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.categoryScroll}
          >
            {CATEGORIES.map((cat) => {
              const isSelected = selectedCategory === cat.id;
              return (
                <TouchableOpacity
                  key={cat.id}
                  onPress={() => setSelectedCategory(cat.id)}
                  style={[
                    styles.categoryChip,
                    isSelected && styles.categoryChipSelected,
                  ]}
                >
                  <Text
                    style={[
                      styles.categoryChipText,
                      isSelected && styles.categoryChipTextSelected,
                    ]}
                  >
                    {cat.name}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        </View>

        {/* Products Grid */}
        <View style={styles.productSection}>
          <View style={styles.sectionHeaderRow}>
            <Text style={styles.sectionTitle}>Featured Party Essentials</Text>
            <Text style={styles.itemCountText}>{filteredProducts.length} Items</Text>
          </View>

          <View style={styles.productGrid}>
            {filteredProducts.map((product, index) => (
              <Animated.View
                key={product.id}
                entering={FadeInUp.duration(500).delay(100 * index)}
                style={styles.productCard}
              >
                {product.tag && (
                  <View style={styles.cardBadge}>
                    <Text style={styles.cardBadgeText}>{product.tag}</Text>
                  </View>
                )}

                <View style={styles.productImagePlaceholder}>
                  <Text style={{ fontSize: 50 }}>{product.image}</Text>
                  <View style={styles.deliveryTimePill}>
                    <Text style={styles.deliveryTimeText}>⚡ {product.time}</Text>
                  </View>
                </View>

                <View style={styles.productDetails}>
                  <View style={styles.ratingRow}>
                    <Text style={styles.ratingText}>{product.rating}</Text>
                  </View>

                  <Text style={styles.productName} numberOfLines={2}>
                    {product.name}
                  </Text>

                  <View style={styles.priceRow}>
                    <View style={styles.priceContainer}>
                      <Text style={styles.priceText}>₹{product.price}</Text>
                      {product.originalPrice && (
                        <Text style={styles.originalPriceText}>₹{product.originalPrice}</Text>
                      )}
                    </View>

                    <TouchableOpacity
                      onPress={() => handleAddToCart(product.price)}
                      style={styles.addButton}
                    >
                      <Text style={styles.addButtonText}>ADD +</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </Animated.View>
            ))}
          </View>
        </View>
      </ScrollView>

      {/* Floating Bottom Cart / Action Bar */}
      {cartCount > 0 && (
        <Animated.View entering={FadeInUp.duration(400)} style={styles.floatingCartBar}>
          <View style={styles.cartInfo}>
            <Text style={styles.cartCountText}>
              {cartCount} ITEM{cartCount > 1 ? 'S' : ''}
            </Text>
            <Text style={styles.cartTotalText}>₹{cartTotal}</Text>
          </View>
          <TouchableOpacity style={styles.checkoutBtn}>
            <Text style={styles.checkoutBtnText}>View Cart 🛒</Text>
            <Text style={{ color: '#000', fontWeight: 'bold' }}>→</Text>
          </TouchableOpacity>
        </Animated.View>
      )}

      {/* Bottom Navigation Tabs */}
      <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.navItem}>
          <Text style={styles.navIconActive}>🏠</Text>
          <Text style={styles.navTextActive}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <Text style={styles.navIcon}>🔍</Text>
          <Text style={styles.navText}>Explore</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <Text style={styles.navIcon}>📦</Text>
          <Text style={styles.navText}>Orders</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <Text style={styles.navIcon}>👤</Text>
          <Text style={styles.navText}>Profile</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0A0A0C',
  },
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 50,
    paddingBottom: 15,
    backgroundColor: '#121216',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.08)',
  },
  locationContainer: {
    flex: 1,
    marginRight: 15,
  },
  locationLabel: {
    color: NEON_YELLOW,
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 1.5,
    marginBottom: 4,
  },
  locationPill: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  locationIcon: {
    fontSize: 14,
    marginRight: 6,
  },
  locationText: {
    color: WHITE,
    fontSize: 15,
    fontWeight: '700',
    maxWidth: 200,
  },
  locationArrow: {
    color: 'rgba(255,255,255,0.6)',
    fontSize: 10,
    marginLeft: 6,
  },
  profileBadge: {
    backgroundColor: NEON_YELLOW,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  profileBadgeText: {
    color: '#000000',
    fontSize: 12,
    fontWeight: '900',
  },
  scrollContent: {
    paddingBottom: 120,
  },
  searchBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.08)',
    marginHorizontal: 20,
    marginTop: 15,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.12)',
  },
  searchIcon: {
    fontSize: 16,
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    color: WHITE,
    fontSize: 15,
    fontWeight: '500',
  },
  promoBanner: {
    marginHorizontal: 20,
    marginTop: 20,
    borderRadius: 20,
    backgroundColor: '#16161D',
    borderWidth: 1.5,
    borderColor: 'rgba(229, 250, 94, 0.4)',
    overflow: 'hidden',
    padding: 20,
  },
  bannerContent: {
    alignItems: 'flex-start',
  },
  liveBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(229, 250, 94, 0.15)',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    marginBottom: 10,
  },
  liveDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: NEON_YELLOW,
    marginRight: 6,
  },
  liveText: {
    color: NEON_YELLOW,
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 1,
  },
  bannerTitle: {
    color: WHITE,
    fontSize: 22,
    fontWeight: '900',
    fontStyle: 'italic',
    marginBottom: 6,
  },
  bannerSubtitle: {
    color: 'rgba(255,255,255,0.8)',
    fontSize: 13,
    lineHeight: 18,
    marginBottom: 14,
  },
  highlightText: {
    color: NEON_YELLOW,
    fontWeight: '700',
  },
  offerTag: {
    backgroundColor: NEON_YELLOW,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 10,
  },
  offerTagText: {
    color: '#000',
    fontSize: 12,
    fontWeight: '800',
  },
  categorySection: {
    marginTop: 24,
  },
  sectionTitle: {
    color: WHITE,
    fontSize: 18,
    fontWeight: '800',
    marginHorizontal: 20,
    marginBottom: 14,
  },
  categoryScroll: {
    paddingHorizontal: 20,
  },
  categoryChip: {
    backgroundColor: 'rgba(255,255,255,0.08)',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 25,
    marginRight: 10,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
  },
  categoryChipSelected: {
    backgroundColor: NEON_YELLOW,
    borderColor: NEON_YELLOW,
  },
  categoryChipText: {
    color: 'rgba(255,255,255,0.8)',
    fontSize: 13,
    fontWeight: '700',
  },
  categoryChipTextSelected: {
    color: '#000000',
    fontWeight: '800',
  },
  productSection: {
    marginTop: 24,
    paddingHorizontal: 20,
  },
  sectionHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 14,
  },
  itemCountText: {
    color: 'rgba(255,255,255,0.5)',
    fontSize: 13,
    fontWeight: '600',
  },
  productGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  productCard: {
    width: '48%',
    backgroundColor: '#141419',
    borderRadius: 18,
    padding: 12,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
    position: 'relative',
  },
  cardBadge: {
    position: 'absolute',
    top: 10,
    left: 10,
    backgroundColor: NEON_YELLOW,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 8,
    zIndex: 10,
  },
  cardBadgeText: {
    color: '#000',
    fontSize: 9,
    fontWeight: '900',
  },
  productImagePlaceholder: {
    height: 110,
    backgroundColor: 'rgba(255,255,255,0.04)',
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
    position: 'relative',
  },
  deliveryTimePill: {
    position: 'absolute',
    bottom: 6,
    right: 6,
    backgroundColor: 'rgba(0,0,0,0.75)',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 6,
  },
  deliveryTimeText: {
    color: NEON_YELLOW,
    fontSize: 10,
    fontWeight: '700',
  },
  productDetails: {
    flex: 1,
    justifyContent: 'space-between',
  },
  ratingRow: {
    marginBottom: 4,
  },
  ratingText: {
    color: NEON_YELLOW,
    fontSize: 11,
    fontWeight: '700',
  },
  productName: {
    color: WHITE,
    fontSize: 14,
    fontWeight: '700',
    lineHeight: 18,
    marginBottom: 10,
  },
  priceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  priceContainer: {
    flexDirection: 'column',
  },
  priceText: {
    color: WHITE,
    fontSize: 16,
    fontWeight: '900',
  },
  originalPriceText: {
    color: 'rgba(255,255,255,0.4)',
    fontSize: 11,
    textDecorationLine: 'line-through',
  },
  addButton: {
    backgroundColor: NEON_YELLOW,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  addButtonText: {
    color: '#000000',
    fontSize: 12,
    fontWeight: '900',
  },
  floatingCartBar: {
    position: 'absolute',
    bottom: 75,
    left: 20,
    right: 20,
    backgroundColor: NEON_YELLOW,
    borderRadius: 20,
    paddingHorizontal: 20,
    paddingVertical: 14,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: NEON_YELLOW,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 10,
    elevation: 10,
  },
  cartInfo: {
    flexDirection: 'column',
  },
  cartCountText: {
    color: '#000000',
    fontSize: 11,
    fontWeight: '800',
    opacity: 0.8,
  },
  cartTotalText: {
    color: '#000000',
    fontSize: 18,
    fontWeight: '900',
  },
  checkoutBtn: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkoutBtnText: {
    color: '#000000',
    fontSize: 16,
    fontWeight: '900',
    marginRight: 6,
  },
  bottomNav: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 65,
    backgroundColor: '#121216',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: 'rgba(255,255,255,0.08)',
  },
  navItem: {
    alignItems: 'center',
  },
  navIcon: {
    fontSize: 18,
    opacity: 0.5,
  },
  navIconActive: {
    fontSize: 18,
  },
  navText: {
    color: 'rgba(255,255,255,0.5)',
    fontSize: 11,
    marginTop: 2,
    fontWeight: '600',
  },
  navTextActive: {
    color: NEON_YELLOW,
    fontSize: 11,
    marginTop: 2,
    fontWeight: '800',
  },
});
