
import { Reply } from 'lucide-react';

export function MessageEmptyState() {
  return (
    <div className="flex items-center justify-center h-full bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="text-center max-w-md">
        <div className="w-20 h-20 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-full mx-auto mb-6 flex items-center justify-center shadow-lg">
          <Reply className="h-10 w-10 text-blue-600" />
        </div>
        <h3 className="text-xl font-semibold text-gray-900 mb-3">
          Select a message
        </h3>
        <p className="text-sm text-gray-600 leading-relaxed">
          Choose a message from the list to view its contents and take actions
        </p>
      </div>
    </div>
  );
}
