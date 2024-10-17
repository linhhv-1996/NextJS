'use client';

import { useState, useRef } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Loader2, Search, X, Smartphone, Star, Zap, Info, Menu, Shield, Download  } from "lucide-react";
import { Pagination } from "@/components/Pagination";


function LoadingSkeleton() {
  return (
    <div className="animate-pulse space-y-4">
      {[1, 2, 3, 4].map((i) => (
        <div key={i} className="h-4 bg-gray-200 rounded"></div>
      ))}
    </div>
  );
}

const renderInfoTable = (info) => (
  <Table>
    <TableHeader>
      <TableRow>
        <TableHead className="w-1/3">Property</TableHead>
        <TableHead>Value</TableHead>
      </TableRow>
    </TableHeader>
    <TableBody>
      {Object.entries(info).map(([key, value]) => (
        <TableRow key={key}>
          <TableCell className="font-medium">{key}</TableCell>
          <TableCell>
            {typeof value === 'object' ? (
              <pre className="whitespace-pre-wrap text-sm">{JSON.stringify(value, null, 2)}</pre>
            ) : (
              value.toString()
            )}
          </TableCell>
        </TableRow>
      ))}
    </TableBody>
  </Table>
);

const renderReviewsTable = (reviews) => (
  <Table>
    <TableHeader>
      <TableRow>
        <TableHead>User Name</TableHead>
        <TableHead>Date</TableHead>
        <TableHead>Rating</TableHead>
        <TableHead>Comment</TableHead>
        <TableHead>App Version</TableHead>
      </TableRow>
    </TableHeader>
    <TableBody>
      {reviews.map((review, index) => (
        <TableRow key={index}>
          <TableCell className="font-medium">{review.userName}</TableCell>
          <TableCell>{new Date(review.date).toLocaleDateString()}</TableCell>
          <TableCell>
            <Badge variant="secondary">{review.score}</Badge>
          </TableCell>
          <TableCell>{review.text}</TableCell>
          <TableCell>{review.version || 'N/A'}</TableCell>
        </TableRow>
      ))}
    </TableBody>
  </Table>
);


const features = [
  {
    icon: <Search className="h-8 w-8 text-blue-500" />,
    title: "Easy Search",
    description: "Quickly find any Android app using its package name."
  },
  {
    icon: <Smartphone className="h-8 w-8 text-green-500" />,
    title: "Detailed Info",
    description: "Get comprehensive details about the app, including version, size, and more."
  },
  {
    icon: <Star className="h-8 w-8 text-yellow-500" />,
    title: "User Reviews",
    description: "Read authentic user reviews to make informed decisions."
  },
  {
    icon: <Zap className="h-8 w-8 text-purple-500" />,
    title: "Fast Results",
    description: "Experience lightning-fast search results and data retrieval."
  },
  {
    icon: <Shield className="h-8 w-8 text-red-500" />,
    title: "Security Check",
    description: "Verify app authenticity and check for potential security risks."
  },
  {
    icon: <Download className="h-8 w-8 text-indigo-500" />,
    title: "Download Stats",
    description: "View download statistics and popularity trends."
  }
];


export default function Home() {
  const [packageName, setPackageName] = useState('');
  const [appData, setAppData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [reviewsPerPage] = useState(5);

  const searchRef = useRef(null);
  const featuresRef = useRef(null);
  const aboutRef = useRef(null);

  const scrollToSection = (ref) => {
    ref.current.scrollIntoView({ behavior: 'smooth' });
    setIsMenuOpen(false);
  };

  const handleSearch = async () => {
    if (!packageName.trim()) {
      setError('Please enter a package name');
      return;
    }

    setIsLoading(true);
    setError(null);
    setAppData(null);

    try {
      const response = await fetch(`/api/app-data?packageName=${packageName}`);
      if (!response.ok) {
        throw new Error('Failed to fetch app data');
      }
      const data = await response.json();
      setAppData(data);
    } catch (error) {
      console.error('Error fetching app data:', error);
      setError('Failed to fetch app data. Please try again.');
    }
    setIsLoading(false);
  };

  const handleClear = () => {
    setPackageName('');
    setAppData(null);
    setError(null);
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const indexOfLastReview = currentPage * reviewsPerPage;
  const indexOfFirstReview = indexOfLastReview - reviewsPerPage;
  const currentReviews = appData?.reviews?.slice(indexOfFirstReview, indexOfLastReview) || [];
  const totalPages = appData?.reviews ? Math.ceil(appData.reviews.length / reviewsPerPage) : 0;



  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-xl sm:text-2xl font-bold text-gray-800">AppInfoHub</h1>
            <nav className="hidden sm:block">
              <ul className="flex space-x-4">
                <li>
                  <Button variant="ghost" onClick={() => scrollToSection(searchRef)}>Search</Button>
                </li>
                <li>
                  <Button variant="ghost" onClick={() => scrollToSection(featuresRef)}>Features</Button>
                </li>
                <li>
                  <Button variant="ghost" onClick={() => scrollToSection(aboutRef)}>About</Button>
                </li>
              </ul>
            </nav>
            <Button variant="ghost" className="sm:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              <Menu />
            </Button>
          </div>
          {isMenuOpen && (
            <nav className="mt-4 sm:hidden">
              <ul className="flex flex-col space-y-2">
                <li>
                  <Button variant="ghost" className="w-full" onClick={() => scrollToSection(searchRef)}>Search</Button>
                </li>
                <li>
                  <Button variant="ghost" className="w-full" onClick={() => scrollToSection(featuresRef)}>Features</Button>
                </li>
                <li>
                  <Button variant="ghost" className="w-full" onClick={() => scrollToSection(aboutRef)}>About</Button>
                </li>
              </ul>
            </nav>
          )}
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 sm:py-12">
        <section ref={searchRef} className="mb-12 sm:mb-16">
          <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-center text-gray-800">Your Gateway to Android App Insights</h2>
          <Card>
            <CardHeader>
              <CardTitle>Search for App Info</CardTitle>
              <CardDescription>Enter an Android app package name to get detailed information</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2 mb-6">
                <div className="relative flex-grow">
                  <Input
                    type="text"
                    placeholder="e.g., com.example.app"
                    value={packageName}
                    onChange={(e) => setPackageName(e.target.value)}
                  />
                  {packageName && (
                    <button
                      onClick={handleClear}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      <X size={20} />
                    </button>
                  )}
                </div>
                <Button onClick={handleSearch} disabled={isLoading} className="w-full sm:w-auto">
                  {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Search className="mr-2 h-4 w-4" />}
                  {isLoading ? 'Searching...' : 'Search'}
                </Button>
              </div>

              {error && <p className="text-red-500 mt-2 text-center">{error}</p>}

              {isLoading ? (
                <LoadingSkeleton />
              ) : appData ? (
                <Tabs defaultValue="info" className="w-full">
                  <TabsList className="grid w-full grid-cols-2 mb-6">
                    <TabsTrigger value="info">Information</TabsTrigger>
                    <TabsTrigger value="reviews">Reviews</TabsTrigger>
                  </TabsList>
                  <TabsContent value="info">
                    <div className="bg-white rounded-lg p-4 overflow-x-auto border">
                      {renderInfoTable(appData.info)}
                    </div>
                  </TabsContent>
                  <TabsContent value="reviews">
                    <div className="bg-white rounded-lg p-4 overflow-x-auto border">
                      {renderReviewsTable(currentReviews)}
                      <Pagination
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onPageChange={handlePageChange}
                      />
                    </div>
                  </TabsContent>
                </Tabs>
              ) : (
                <p className="text-center text-gray-500 mt-4">Enter an Android app package name and click Search to get app information.</p>
              )}
            </CardContent>
          </Card>
        </section>


        <section ref={featuresRef} className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <Card key={index} className="transition-all duration-300 hover:shadow-lg">
                <CardHeader className="flex flex-col items-center">
                  <div className="p-2 rounded-full bg-gray-100 mb-4">
                    {feature.icon}
                  </div>
                  <CardTitle className="text-xl font-semibold text-center">
                    {feature.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-center text-gray-600">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>


        <section ref={aboutRef} className="mb-12 sm:mb-16">
          <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-center text-gray-800">About AppInfoHub</h2>
          <Card>
            <CardHeader>
              <Info className="h-8 w-8 mb-2 text-purple-500" />
              <CardTitle>Our Mission</CardTitle>
            </CardHeader>

            <CardContent>
              <p className="text-gray-600">
                AppInfoHub is dedicated to providing developers, marketers, and app enthusiasts with quick and easy access to detailed information about Android applications. We believe that transparency and information accessibility are crucial in the ever-growing app ecosystem.
              </p>
              <p className="text-gray-600 mt-4">
                Our tool allows you to search for any Android app by its package name and instantly retrieve comprehensive details and user reviews. Whether you're conducting market research, competitive analysis, or simply curious about an app, AppInfoHub is your go-to resource for Android app insights.
              </p>
            </CardContent>
          </Card>
        </section>
      </main>

      <footer className="bg-gray-100 py-8">
        <div className="container mx-auto px-4 text-center text-gray-600">
          <p>&copy; 2023 AppInfoHub. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
