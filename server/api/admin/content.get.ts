import { defineEventHandler } from 'h3'
import { requireAdminSession } from '../../utils/admin'
import { collectionFiles, readCollection, sanitizeRecordForAdmin } from '../../utils/adminContent'

export default defineEventHandler(async (event) => {
  requireAdminSession(event)

  const collections = await Promise.all(
    Object.keys(collectionFiles).map(async (collection) => [
      collection,
      (await readCollection(collection)).map(sanitizeRecordForAdmin)
    ])
  )

  return Object.fromEntries(collections)
})
