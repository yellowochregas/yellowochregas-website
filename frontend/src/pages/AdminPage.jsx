import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "sonner";
import Button from "../components/ui/button";
import Input from "../components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import Badge from "../components/ui/badge";
import { 
  Mail, 
  Phone, 
  User, 
  Calendar, 
  Trash2, 
  CheckCircle,
  LogOut,
  Lock,
  MessageSquare,
  ArrowLeft
} from "lucide-react";
import { Link } from "react-router-dom";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(false);

  const getAuthHeader = () => {
    const credentials = btoa(`${username}:${password}`);
    return { Authorization: `Basic ${credentials}` };
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post(`${API}/admin/login`, { username, password });
      if (response.data.success) {
        setIsAuthenticated(true);
        toast.success("Login successful");
        fetchContacts();
      }
    } catch (error) {
      toast.error("Invalid credentials");
    } finally {
      setLoading(false);
    }
  };

  const fetchContacts = async () => {
    try {
      const response = await axios.get(`${API}/admin/contacts`, {
        headers: getAuthHeader()
      });
      setContacts(response.data);
    } catch (error) {
      toast.error("Failed to fetch contacts");
    }
  };

  const markAsRead = async (contactId) => {
    try {
      await axios.patch(`${API}/admin/contacts/${contactId}/read`, {}, {
        headers: getAuthHeader()
      });
      setContacts(contacts.map(c => 
        c.id === contactId ? { ...c, read: true } : c
      ));
      toast.success("Marked as read");
    } catch (error) {
      toast.error("Failed to update");
    }
  };

  const deleteContact = async (contactId) => {
    if (!window.confirm("Are you sure you want to delete this inquiry?")) return;
    
    try {
      await axios.delete(`${API}/admin/contacts/${contactId}`, {
        headers: getAuthHeader()
      });
      setContacts(contacts.filter(c => c.id !== contactId));
      toast.success("Deleted successfully");
    } catch (error) {
      toast.error("Failed to delete");
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setUsername("");
    setPassword("");
    setContacts([]);
    toast.info("Logged out");
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-GB", {
      day: "numeric",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit"
    });
  };

  const unreadCount = contacts.filter(c => !c.read).length;

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <div className="mx-auto w-16 h-16 bg-yellow-500 rounded-full flex items-center justify-center mb-4">
              <Lock className="w-8 h-8 text-gray-900" />
            </div>
            <CardTitle className="font-heading text-2xl text-gray-800">
              Admin Login
            </CardTitle>
            <p className="text-gray-600 text-sm mt-2">
              Yellow Ochre Gas Dashboard
            </p>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <Input
                  data-testid="admin-username-input"
                  type="text"
                  placeholder="Username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="h-12"
                  required
                />
              </div>
              <div>
                <Input
                  data-testid="admin-password-input"
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="h-12"
                  required
                />
              </div>
              <Button
                data-testid="admin-login-btn"
                type="submit"
                className="w-full h-12 bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-semibold"
                disabled={loading}
              >
                {loading ? "Logging in..." : "Login"}
              </Button>
            </form>
            <Link to="/" className="block mt-6">
              <Button
                data-testid="back-to-home-btn"
                variant="outline"
                className="w-full"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Website
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Admin Header */}
      <header className="bg-gray-800 text-white py-4 px-6 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <h1 className="font-heading text-xl">Yellow Ochre Gas</h1>
            <Badge className="bg-yellow-500 text-gray-900">Admin</Badge>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-300">Welcome, {username}</span>
            <Button
              data-testid="admin-logout-btn"
              variant="outline"
              size="sm"
              onClick={handleLogout}
              className="border-gray-600 text-white hover:bg-gray-700"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      {/* Dashboard Content */}
      <main className="max-w-7xl mx-auto p-6">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Total Inquiries</p>
                  <p className="text-3xl font-bold text-gray-800">{contacts.length}</p>
                </div>
                <MessageSquare className="w-12 h-12 text-yellow-500" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Unread</p>
                  <p className="text-3xl font-bold text-yellow-600">{unreadCount}</p>
                </div>
                <Mail className="w-12 h-12 text-yellow-500" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Read</p>
                  <p className="text-3xl font-bold text-green-600">{contacts.length - unreadCount}</p>
                </div>
                <CheckCircle className="w-12 h-12 text-green-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Inquiries List */}
        <Card>
          <CardHeader>
            <CardTitle className="font-heading text-xl flex items-center gap-2">
              <MessageSquare className="w-5 h-5 text-yellow-500" />
              Contact Inquiries
            </CardTitle>
          </CardHeader>
          <CardContent>
            {contacts.length === 0 ? (
              <div className="text-center py-12 text-gray-500">
                <MessageSquare className="w-16 h-16 mx-auto mb-4 opacity-50" />
                <p>No inquiries yet</p>
              </div>
            ) : (
              <div className="space-y-4">
                {contacts.map((contact) => (
                  <div
                    key={contact.id}
                    data-testid={`contact-card-${contact.id}`}
                    className={`admin-card p-4 border rounded-lg ${
                      !contact.read ? "unread bg-yellow-50" : "bg-white"
                    }`}
                  >
                    <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <User className="w-4 h-4 text-gray-500" />
                          <span className="font-semibold text-gray-800">{contact.name}</span>
                          {!contact.read && (
                            <Badge className="bg-yellow-500 text-gray-900 text-xs">New</Badge>
                          )}
                        </div>
                        <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 mb-3">
                          <span className="flex items-center gap-1">
                            <Mail className="w-4 h-4" />
                            {contact.email}
                          </span>
                          <span className="flex items-center gap-1">
                            <Phone className="w-4 h-4" />
                            {contact.phone}
                          </span>
                          <span className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            {formatDate(contact.created_at)}
                          </span>
                        </div>
                        <p className="text-gray-700 bg-gray-50 p-3 rounded-lg">
                          {contact.message}
                        </p>
                      </div>
                      <div className="flex gap-2">
                        {!contact.read && (
                          <Button
                            data-testid={`mark-read-btn-${contact.id}`}
                            size="sm"
                            variant="outline"
                            onClick={() => markAsRead(contact.id)}
                            className="text-green-600 border-green-600 hover:bg-green-50"
                          >
                            <CheckCircle className="w-4 h-4" />
                          </Button>
                        )}
                        <Button
                          data-testid={`delete-btn-${contact.id}`}
                          size="sm"
                          variant="outline"
                          onClick={() => deleteContact(contact.id)}
                          className="text-red-600 border-red-600 hover:bg-red-50"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
