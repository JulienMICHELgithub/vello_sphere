'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import {
    Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogTrigger,
}
from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

import { useCreateBike } from '@/app/hooks/useCreateBike'
import { listBikeTypes, type BikeType } from '@/app/services/bike'

type Props = { onCreated?: () => Promise<void> | void }

export default function AddBikeButton({ onCreated }: Props) {
    const [open, setOpen] = useState(false)
    const [name, setName] = useState('')
    const [typeId, setTypeId] = useState<number | null>(null)
    const [types, setTypes] = useState<BikeType[]>([])
    const { mutate, isCreating, error } = useCreateBike()

    useEffect(() => {
        let mounted = true
        listBikeTypes().then((t) => { if (mounted) setTypes(t) }).catch(() => {})
        return () => { mounted = false }
    }, [])

    const submit = async () => {
        if (!name.trim()) return
        const created = await mutate({ name: name.trim(), type_id: typeId })
        if (created) {
            setOpen(false)
            setName('')
            setTypeId(null)
            await onCreated?.()
        }
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant="ghost">Ajouter un vélo</Button>
            </DialogTrigger>

            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>Ajouter un vélo</DialogTitle>
                </DialogHeader>

                <div className="space-y-4">
                    <div className="grid gap-2">
                        <Label htmlFor="bike-name">Nom</Label>
                        <Input
                            id="bike-name"
                            placeholder="Mon gravel"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>

                    <div className="grid gap-2">
                        <Label>Type</Label>
                        <Select
                            value={typeId ? String(typeId) : undefined}
                            onValueChange={(v) => setTypeId(Number(v))}
                        >
                            <SelectTrigger><SelectValue placeholder="Choisir un type" /></SelectTrigger>
                            <SelectContent>
                                {types.map((t) => (
                                    <SelectItem key={t.id} value={String(t.id)}>
                                        {t.name}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>

                    {error && <p className="text-sm text-red-600">{error}</p>}
                </div>

                <DialogFooter>
                    <Button variant="secondary" onClick={() => setOpen(false)} disabled={isCreating}>
                        Annuler
                    </Button>
                    <Button onClick={submit} disabled={isCreating || !name.trim()}>
                        {isCreating ? 'Ajout…' : 'Valider'}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
