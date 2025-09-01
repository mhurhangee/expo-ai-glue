/**
 * Collection names used in the incident mesh
 */
export const COLLECTIONS = {
    INCIDENT_REPORTS: 'incident_reports',
    PERSONNEL: 'personnel',
    RESOURCES: 'resources',
    COMMUNICATIONS: 'communications',
    LOCATIONS: 'locations',
    TASKS: 'tasks',
  } as const;
  
  /**
   * Collection schemas and validation
   */
  export const COLLECTION_SCHEMAS = {
    [COLLECTIONS.INCIDENT_REPORTS]: {
      required: ['title', 'timestamp', 'deviceId', 'priority', 'status'],
      properties: {
        _id: { type: 'string' },
        title: { type: 'string' },
        description: { type: 'string' },
        timestamp: { type: 'string' },
        deviceId: { type: 'string' },
        priority: { enum: ['low', 'medium', 'high', 'critical'] },
        status: { enum: ['pending', 'in-progress', 'resolved'] },
        location: {
          type: 'object',
          properties: {
            lat: { type: 'number' },
            lng: { type: 'number' },
          }
        }
      }
    },
    
    [COLLECTIONS.PERSONNEL]: {
      required: ['name', 'role', 'status', 'deviceId'],
      properties: {
        _id: { type: 'string' },
        name: { type: 'string' },
        role: { type: 'string' },
        status: { enum: ['available', 'busy', 'offline'] },
        deviceId: { type: 'string' },
        lastSeen: { type: 'string' },
      }
    },
  } as const;