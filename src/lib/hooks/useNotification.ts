import { writable } from 'svelte/store'
import { v4 as uuidv4 } from 'uuid'

export type Notification = {
	message: string
	type: 'error' | 'success'
	uuid?: string
}

const notifications = writable<Array<Notification>>([])

export const useNotification = () => {
	const create = (n: Notification) => {
		const uuid = uuidv4()
		n.uuid = uuid
		notifications.update((prev) => [...prev, n])
		setTimeout(() => remove(uuid), 5000)
	}

	const remove = (uuid?: string) => {
		if (!uuid) return
		notifications.update((prev) => prev.filter((n) => n.uuid !== uuid))
	}

	return {
		create,
		remove,
		notifications,
	}
}
