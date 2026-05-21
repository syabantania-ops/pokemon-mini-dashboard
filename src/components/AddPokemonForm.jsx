import { useState } from 'react'
import axios from 'axios'

export default function AddPokemonForm() {
  const [formData, setFormData] = useState({
    name: '',
    type: '',
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [message, setMessage] = useState(null)

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    setMessage(null)

    try {
      await axios.post('https://jsonplaceholder.typicode.com/posts', {
        title: formData.name,
        body: `Pokemon type: ${formData.type}`,
        userId: 1,
      })

      setMessage({
        type: 'success',
        text: 'Data Pokemon favorit berhasil dikirim!',
      })

      setFormData({
        name: '',
        type: '',
      })
    } catch (error) {
      setMessage({
        type: 'error',
        text: 'Gagal mengirim data. Coba lagi.',
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="mb-10 rounded-3xl border border-white/10 bg-white/10 p-6 shadow-2xl backdrop-blur-md">
      <div className="mb-5">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-cyan-300">
          POST API
        </p>

        <h2 className="mt-2 text-2xl font-bold">
          Tambah Pokemon Favorit
        </h2>

        <p className="mt-1 text-sm text-slate-300">
          Form ini mengirim data menggunakan method POST ke JSONPlaceholder.
        </p>
      </div>

      {message && (
        <div
          className={`mb-5 rounded-2xl px-5 py-4 font-semibold ${
            message.type === 'success'
              ? 'bg-green-500/20 text-green-300'
              : 'bg-red-500/20 text-red-300'
          }`}
        >
          {message.text}
        </div>
      )}

      <form onSubmit={handleSubmit} className="grid gap-4 md:grid-cols-3">
        <input
          type="text"
          name="name"
          placeholder="Nama Pokemon favorit"
          value={formData.name}
          onChange={handleChange}
          required
          className="rounded-2xl border border-white/10 bg-slate-950/40 px-5 py-4 text-white outline-none placeholder:text-slate-400 focus:border-cyan-400 focus:ring-4 focus:ring-cyan-500/20"
        />

        <input
          type="text"
          name="type"
          placeholder="Tipe Pokemon, contoh: fire"
          value={formData.type}
          onChange={handleChange}
          required
          className="rounded-2xl border border-white/10 bg-slate-950/40 px-5 py-4 text-white outline-none placeholder:text-slate-400 focus:border-cyan-400 focus:ring-4 focus:ring-cyan-500/20"
        />

        <button
          type="submit"
          disabled={isSubmitting}
          className="rounded-2xl bg-cyan-500 px-5 py-4 font-bold text-slate-950 transition hover:bg-cyan-400 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isSubmitting ? 'Mengirim...' : 'Kirim Data'}
        </button>
      </form>
    </div>
  )
}