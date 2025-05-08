
import React, { useState } from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Search, Plus, UserPlus, Mail, Phone, Edit, Trash } from 'lucide-react';
import { toast } from 'sonner';

// Sample user data
const users = [
  { id: 1, name: 'John Doe', email: 'john@example.com', phone: '+1 555-123-4567', status: 'active', rides: 12, created: '2023-09-15' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', phone: '+1 555-234-5678', status: 'active', rides: 8, created: '2023-10-02' },
  { id: 3, name: 'Robert Brown', email: 'robert@example.com', phone: '+1 555-345-6789', status: 'inactive', rides: 3, created: '2023-11-11' },
  { id: 4, name: 'Lisa Johnson', email: 'lisa@example.com', phone: '+1 555-456-7890', status: 'active', rides: 20, created: '2023-08-24' },
  { id: 5, name: 'Michael Williams', email: 'michael@example.com', phone: '+1 555-567-8901', status: 'blocked', rides: 0, created: '2023-12-05' },
  { id: 6, name: 'Sarah Davis', email: 'sarah@example.com', phone: '+1 555-678-9012', status: 'active', rides: 15, created: '2023-07-19' },
  { id: 7, name: 'Tom Wilson', email: 'tom@example.com', phone: '+1 555-789-0123', status: 'active', rides: 7, created: '2023-10-30' },
  { id: 8, name: 'Emily Taylor', email: 'emily@example.com', phone: '+1 555-890-1234', status: 'inactive', rides: 2, created: '2023-11-25' },
];

const AdminUsers = () => {
  const [searchTerm, setSearchTerm] = useState('');
  
  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  const handleDeleteUser = (id: number) => {
    toast.success(`User ${id} has been deleted`);
  };
  
  return (
    <DashboardLayout userType="admin">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">User Management</h1>
        <Dialog>
          <DialogTrigger asChild>
            <Button className="bg-fleet-red hover:bg-fleet-red/90">
              <UserPlus className="mr-2 h-4 w-4" />
              Add User
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New User</DialogTitle>
            </DialogHeader>
            <form className="space-y-4 pt-4">
              <div>
                <label htmlFor="name" className="text-sm font-medium">Full Name</label>
                <Input id="name" placeholder="John Doe" />
              </div>
              <div>
                <label htmlFor="email" className="text-sm font-medium">Email</label>
                <Input id="email" type="email" placeholder="john@example.com" />
              </div>
              <div>
                <label htmlFor="phone" className="text-sm font-medium">Phone Number</label>
                <Input id="phone" placeholder="+1 555-123-4567" />
              </div>
              <Button type="submit" className="w-full bg-fleet-red hover:bg-fleet-red/90">
                Add User
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold">{users.length}</div>
            <p className="text-sm text-gray-500">Total Users</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold">{users.filter(u => u.status === 'active').length}</div>
            <p className="text-sm text-gray-500">Active Users</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold">{users.filter(u => u.status === 'inactive').length}</div>
            <p className="text-sm text-gray-500">Inactive Users</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold">{users.filter(u => u.status === 'blocked').length}</div>
            <p className="text-sm text-gray-500">Blocked Users</p>
          </CardContent>
        </Card>
      </div>
      
      <Card>
        <CardHeader>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <CardTitle>Users</CardTitle>
            <div className="relative w-full md:w-64">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
              <Input
                placeholder="Search users..."
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="all">
            <TabsList className="mb-6">
              <TabsTrigger value="all">All Users</TabsTrigger>
              <TabsTrigger value="active">Active</TabsTrigger>
              <TabsTrigger value="inactive">Inactive</TabsTrigger>
              <TabsTrigger value="blocked">Blocked</TabsTrigger>
            </TabsList>
            
            <TabsContent value="all">
              <div className="rounded-md border">
                <div className="relative w-full overflow-auto">
                  <table className="w-full caption-bottom text-sm">
                    <thead>
                      <tr className="border-b bg-gray-50">
                        <th className="h-12 px-4 text-left font-medium text-gray-500">Name</th>
                        <th className="h-12 px-4 text-left font-medium text-gray-500">Contact</th>
                        <th className="h-12 px-4 text-left font-medium text-gray-500">Status</th>
                        <th className="h-12 px-4 text-left font-medium text-gray-500">Rides</th>
                        <th className="h-12 px-4 text-left font-medium text-gray-500">Created</th>
                        <th className="h-12 px-4 text-right font-medium text-gray-500">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredUsers.length > 0 ? (
                        filteredUsers.map((user) => (
                          <tr key={user.id} className="border-b">
                            <td className="p-4 font-medium">{user.name}</td>
                            <td className="p-4">
                              <div className="flex flex-col">
                                <div className="flex items-center gap-1">
                                  <Mail className="h-3 w-3 text-gray-500" />
                                  <span className="text-sm">{user.email}</span>
                                </div>
                                <div className="flex items-center gap-1 mt-1">
                                  <Phone className="h-3 w-3 text-gray-500" />
                                  <span className="text-sm">{user.phone}</span>
                                </div>
                              </div>
                            </td>
                            <td className="p-4">
                              <Badge className={`
                                ${user.status === 'active' ? 'bg-green-100 text-green-800' : 
                                  user.status === 'inactive' ? 'bg-yellow-100 text-yellow-800' : 
                                  'bg-red-100 text-red-800'}
                              `}>
                                {user.status.charAt(0).toUpperCase() + user.status.slice(1)}
                              </Badge>
                            </td>
                            <td className="p-4">{user.rides}</td>
                            <td className="p-4">{user.created}</td>
                            <td className="p-4 text-right">
                              <Button variant="ghost" size="icon">
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button 
                                variant="ghost" 
                                size="icon" 
                                onClick={() => handleDeleteUser(user.id)}
                              >
                                <Trash className="h-4 w-4 text-red-500" />
                              </Button>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan={6} className="h-24 text-center text-gray-500">
                            No users found
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="active">
              <div className="rounded-md border">
                <div className="relative w-full overflow-auto">
                  <table className="w-full caption-bottom text-sm">
                    <thead>
                      <tr className="border-b bg-gray-50">
                        <th className="h-12 px-4 text-left font-medium text-gray-500">Name</th>
                        <th className="h-12 px-4 text-left font-medium text-gray-500">Contact</th>
                        <th className="h-12 px-4 text-left font-medium text-gray-500">Status</th>
                        <th className="h-12 px-4 text-left font-medium text-gray-500">Rides</th>
                        <th className="h-12 px-4 text-left font-medium text-gray-500">Created</th>
                        <th className="h-12 px-4 text-right font-medium text-gray-500">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredUsers.filter(u => u.status === 'active').map((user) => (
                        <tr key={user.id} className="border-b">
                          <td className="p-4 font-medium">{user.name}</td>
                          <td className="p-4">
                            <div className="flex flex-col">
                              <div className="flex items-center gap-1">
                                <Mail className="h-3 w-3 text-gray-500" />
                                <span className="text-sm">{user.email}</span>
                              </div>
                              <div className="flex items-center gap-1 mt-1">
                                <Phone className="h-3 w-3 text-gray-500" />
                                <span className="text-sm">{user.phone}</span>
                              </div>
                            </div>
                          </td>
                          <td className="p-4">
                            <Badge className="bg-green-100 text-green-800">
                              Active
                            </Badge>
                          </td>
                          <td className="p-4">{user.rides}</td>
                          <td className="p-4">{user.created}</td>
                          <td className="p-4 text-right">
                            <Button variant="ghost" size="icon">
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button 
                              variant="ghost" 
                              size="icon" 
                              onClick={() => handleDeleteUser(user.id)}
                            >
                              <Trash className="h-4 w-4 text-red-500" />
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </TabsContent>
            
            {/* Similar content for inactive and blocked tabs */}
            <TabsContent value="inactive">
              {/* Same table structure with filtered users */}
            </TabsContent>
            
            <TabsContent value="blocked">
              {/* Same table structure with filtered users */}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </DashboardLayout>
  );
};

export default AdminUsers;
