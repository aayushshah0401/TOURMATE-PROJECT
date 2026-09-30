import React, { useState } from 'react';
import { Building2, Plus, Eye, MousePointerClick, CheckCircle2, Hotel, Utensils, Compass, Phone } from 'lucide-react';
import { getLocalBusinessListings, saveLocalBusinessListing } from '../../services/api';
import { BusinessListing } from '../../types';
import { useApp } from '../../context/AppContext';

export const BusinessDashboard: React.FC = () => {
  const { showNotification } = useApp();
  const [listings, setListings] = useState<BusinessListing[]>(getLocalBusinessListings());
  const [showAddForm, setShowAddForm] = useState(false);

  const [form, setForm] = useState({
    businessName: '',
    category: 'hotel' as 'hotel' | 'restaurant' | 'guide',
    ownerEmail: '',
    phone: '',
    address: '',
    city: 'Ahmedabad',
    description: '',
    pricing: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const created = saveLocalBusinessListing(form);
    setListings([created, ...listings]);
    setShowAddForm(false);
    showNotification(`Registered business ${form.businessName} on TourMate Ecosystem!`);
    setForm({
      businessName: '',
      category: 'hotel',
      ownerEmail: '',
      phone: '',
      address: '',
      city: 'Ahmedabad',
      description: '',
      pricing: ''
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-amber-900 via-orange-950 to-slate-900 text-white p-6 sm:p-8 rounded-3xl shadow-xl flex flex-col sm:flex-row items-center justify-between gap-4 border border-amber-800">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-2 bg-amber-400/20 text-amber-300 border border-amber-400/30 px-3 py-1 rounded-full text-xs font-bold">
            <Building2 className="w-4 h-4" /> Tourism Business Portal
          </div>
          <h1 className="text-2xl sm:text-3xl font-black">List Hotel, Restaurant, or Tour Service</h1>
          <p className="text-xs text-slate-300">Connect directly with tourists using TourMate AI Planner and Kiosk network.</p>
        </div>

        <button
          onClick={() => setShowAddForm(true)}
          className="bg-amber-500 hover:bg-amber-400 text-slate-950 px-5 py-3 rounded-2xl font-black text-xs shadow-lg transition flex items-center gap-2 cursor-pointer"
        >
          <Plus className="w-4 h-4" /> Register New Listing
        </button>
      </div>

      {/* KPI Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-slate-900">
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex items-center gap-4">
          <div className="bg-amber-100 p-3 rounded-xl text-amber-700">
            <Building2 className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs font-bold text-slate-500">Active Listings</p>
            <p className="text-2xl font-black">{listings.length}</p>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex items-center gap-4">
          <div className="bg-emerald-100 p-3 rounded-xl text-emerald-700">
            <Eye className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs font-bold text-slate-500">Total Tourist Views</p>
            <p className="text-2xl font-black">863</p>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex items-center gap-4">
          <div className="bg-indigo-100 p-3 rounded-xl text-indigo-700">
            <MousePointerClick className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs font-bold text-slate-500">Referral Clicks</p>
            <p className="text-2xl font-black">229</p>
          </div>
        </div>
      </div>

      {/* Form Modal */}
      {showAddForm && (
        <div className="fixed inset-0 z-50 bg-slate-900/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 max-w-lg w-full shadow-2xl space-y-4 text-xs text-slate-900">
            <h3 className="text-lg font-extrabold text-slate-900">Add Tourism Service Profile</h3>

            <form onSubmit={handleSubmit} className="space-y-3">
              <div>
                <label className="block font-bold mb-1">Business Name</label>
                <input
                  type="text"
                  required
                  value={form.businessName}
                  onChange={(e) => setForm({ ...form, businessName: e.target.value })}
                  placeholder="e.g. Statue View Resort"
                  className="w-full p-2.5 bg-slate-50 border rounded-xl font-semibold"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold mb-1">Category</label>
                  <select
                    value={form.category}
                    onChange={(e) => setForm({ ...form, category: e.target.value as any })}
                    className="w-full p-2.5 bg-slate-50 border rounded-xl font-semibold"
                  >
                    <option value="hotel">Hotel / Resort</option>
                    <option value="restaurant">Restaurant / Street Food</option>
                    <option value="guide">Tour Guide Service</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold mb-1">City</label>
                  <input
                    type="text"
                    required
                    value={form.city}
                    onChange={(e) => setForm({ ...form, city: e.target.value })}
                    className="w-full p-2.5 bg-slate-50 border rounded-xl font-semibold"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold mb-1">Phone Number</label>
                <input
                  type="text"
                  required
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  placeholder="+91 98765 00000"
                  className="w-full p-2.5 bg-slate-50 border rounded-xl font-semibold"
                />
              </div>

              <div>
                <label className="block font-bold mb-1">Pricing Info</label>
                <input
                  type="text"
                  required
                  value={form.pricing}
                  onChange={(e) => setForm({ ...form, pricing: e.target.value })}
                  placeholder="e.g. ₹3,500 / night or ₹300 / person"
                  className="w-full p-2.5 bg-slate-50 border rounded-xl font-semibold"
                />
              </div>

              <div>
                <label className="block font-bold mb-1">Address & Description</label>
                <textarea
                  required
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                  placeholder="Briefly describe facilities, cuisine, or specialty..."
                  className="w-full p-2.5 bg-slate-50 border rounded-xl font-medium h-20"
                />
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddForm(false)}
                  className="flex-1 bg-slate-100 font-bold py-2.5 rounded-xl text-slate-700"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-amber-500 font-black py-2.5 rounded-xl text-slate-950"
                >
                  Save Listing
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Listings Cards */}
      <div className="space-y-4">
        <h3 className="text-lg font-bold text-slate-900">Registered Listings</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          {listings.map(item => (
            <div key={item.id} className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-3">
              <div className="flex items-center justify-between">
                <span className="bg-amber-100 text-amber-900 text-[10px] font-bold px-2.5 py-0.5 rounded-md uppercase">
                  {item.category}
                </span>
                <span className="text-emerald-600 font-bold flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Verified
                </span>
              </div>

              <h4 className="font-extrabold text-slate-900 text-sm">{item.businessName}</h4>
              <p className="text-slate-500 font-medium">{item.description}</p>
              <p className="font-bold text-slate-800">Pricing: {item.pricing} • {item.phone}</p>

              <div className="flex justify-between items-center text-[11px] text-slate-400 pt-2 border-t">
                <span>{item.viewsCount} Tourist Views</span>
                <span>{item.clicksCount} Direct Referral Calls</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
