import { Injectable } from '@angular/core';
import { createClient, SupabaseClient, User } from '@supabase/supabase-js';

@Injectable({
  providedIn: 'root',
})
export class SupabaseService {
  public supabase: SupabaseClient;

  constructor() {
    this.supabase = createClient(
      'https://xabrkncoraentqtzxvrg.supabase.co', // Your Supabase URL
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhhYnJrbmNvcmFlbnRxdHp4dnJnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjI3MDc0NTIsImV4cCI6MjA3ODI4MzQ1Mn0.fLaWx6OeWLkfNv8HRZKVP2fKRBc79ymS9J0mhEw700E'  // Replace with your real anon key
    );
    
    // Run safe auth check to prevent NavigatorLock errors
    this.safeAuthCheck();
  }

  private async safeAuthCheck() {
    try {
      const { data, error } = await this.supabase.auth.getSession();
      if (error) console.warn('Supabase auth error:', error);
      console.log('Supabase session data:', data);
    } catch (err) {
      console.warn('Supabase lock error ignored:', err);
    }
  }

  /** PRODUCTS */

  async getProducts(): Promise<any[]> {
    try {
      const { data, error } = await this.supabase
        .from('items')
        .select('*')
        .order('id', { ascending: true });

      if (error) throw error;
      return data;
    } catch (err) {
      console.error('Error fetching products:', err);
      return [];
    }
  }

  async searchProducts(query: string): Promise<any[]> {
    if (!query) return this.getProducts();

    try {
      const { data, error } = await this.supabase
        .from('items')
        .select('*')
        .ilike('name', `%${query}%`)
        .order('id', { ascending: true });

      if (error) throw error;
      return data;
    } catch (err) {
      console.error('Error searching products:', err);
      return [];
    }
  }

  /** COUPONS */

  async getActiveCoupons(): Promise<any[]> {
    try {
      const { data, error } = await this.supabase
        .from('coupons')
        .select('*')
        .eq('isActive', true)
        .order('id', { ascending: true });

      if (error) throw error;
      return data;
    } catch (err) {
      console.error('Error fetching coupons:', err);
      return [];
    }
  }

  async getCouponByCode(code: string): Promise<any | null> {
    try {
      const { data, error } = await this.supabase
        .from('coupons')
        .select('*')
        .eq('code', code)
        .single();

      if (error) throw error;
      return data;
    } catch (err) {
      console.error('Error fetching coupon:', err);
      return null;
    }
  }

  /** PAYMENTS */

  /** Cash on Delivery */
  async payCOD(userId: string, amount: number) {
    const { data, error } = await this.supabase
      .from('payments')
      .insert([
        {
          user_id: userId,
          method: 'cod',
          amount,
          status: 'pending',
        },
      ]);
    if (error) throw error;
    return data;
  }

 async createOrder(userId: string, address: any, items: any[], total: number) {
  try {
    // Insert into orders table
    const { data: orderData, error: orderError } = await this.supabase
      .from('orders')
      .insert([{
        user_id: userId,
        address: JSON.stringify(address),
        total,
        status: 'pending', // current order
        created_at: new Date().toISOString()
      }])
      .select(); // return inserted row

    if (orderError) throw orderError;

    const orderId = orderData[0].id;

    // Insert order items
    const orderItems = items.map(item => ({
      order_id: orderId,
      item_id: item.id,
      quantity: item.quantity,
      price: item.price
    }));

    const { error: itemsError } = await this.supabase
      .from('order_items')
      .insert(orderItems);

    if (itemsError) throw itemsError;

    return orderData[0];
  } catch (err) {
    console.error('Error creating order:', err);
    throw err;
  }
}

/** Fetch all orders for a user, including item info */
async getOrders(userId: string): Promise<any[]> {
  try {
    const { data, error } = await this.supabase
    
      .from('orders')
      .select(`
        *,
        order_items(
          quantity,
          price,
          item:items(name, cover)
        )
      `)
      .eq('user_id', userId)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data || [];
  } catch (err) {
    console.error('Error fetching orders:', err);
    return [];
  }
}

/** Mark current order as complete */
async completeOrder(orderId: number) {
  try {
    const { data, error } = await this.supabase
      .from('orders')
      .update({ status: 'completed' })
      .eq('id', orderId)
      .select();

    if (error) throw error;
    return data[0];
  } catch (err) {
    console.error('Error completing order:', err);
    throw err;
  }
}


  async signUp(email: string, password: string): Promise<User> {
    const { data, error } = await this.supabase.auth.signUp({ email, password });
    if (error) throw error;
    if (!data.user) throw new Error('User not returned');
    return data.user;
  }

  // Sign in
  async signIn(email: string, password: string): Promise<User> {
    const { data, error } = await this.supabase.auth.signInWithPassword({ email, password });
    if (error) throw error;
    if (!data.user) throw new Error('User not returned');
    return data.user;
  }

  // Sign out
  async signOut() {
    const { error } = await this.supabase.auth.signOut();
    if (error) throw error;
  }

  // Get current user
  async getCurrentUser(): Promise<User | null> {
    const { data } = await this.supabase.auth.getUser();
    return data.user;
  }

  /** Get the current logged-in user's UUID */
async getUserId(): Promise<string> {
  const { data: { user }, error } = await this.supabase.auth.getUser();
  if (error) throw error;
  if (!user) throw new Error('No logged-in user found');
  return user.id;
}


  // Create user profile
  async createProfile(userId: string, fullName: string, avatarUrl: string) {
    const { error } = await this.supabase.from('profiles').insert({
      user_id: userId,
      full_name: fullName,
      avatar: avatarUrl
    });
    if (error) throw error;
  }

 

  // Get user profile from 'profiles' table
  async getProfile(userId: string) {
    const { data, error } = await this.supabase
      .from('profiles')
      .select('*')
      .eq('user_id', userId)
      .maybeSingle();

    if (error) {
      console.error('Error fetching profile:', error);
      return null;
    }
    return data;
  }

  // Update user profile (name & email)
  async updateProfile(userId: string, name: string, email: string) {
    try {
      // Update email in auth
      if (email) {
        const { error: emailError } = await this.supabase.auth.updateUser({ email });
        if (emailError) throw emailError;
      }

      // Update name in 'profiles' table
      const { error } = await this.supabase
        .from('profiles')
        .update({ full_name: name })
        .eq('user_id', userId);

      if (error) throw error;

      return true;
    } catch (err) {
      console.error('Error updating profile:', err);
      return false;
    }
  }
  // Upload avatar
  async uploadAvatar(file: File): Promise<string> {
    const fileExt = file.name.split('.').pop();
    const fileName = `${Math.random()}.${fileExt}`;
    const { data, error } = await this.supabase.storage
      .from('avatars')
      .upload(fileName, file);
    if (error) throw error;

    const { data: publicData } = this.supabase.storage
      .from('avatars')
      .getPublicUrl(fileName);

    return publicData.publicUrl;
  }

  // Update user password
  async updatePassword(newPassword: string) {
    const user = await this.getCurrentUser();
    if (!user) throw new Error('No user logged in');

    const { error } = await this.supabase.auth.updateUser({ password: newPassword });
    if (error) throw error;
  }
}
