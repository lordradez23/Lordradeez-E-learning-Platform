import { MetricCard } from "@/components";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { DollarSign, Trophy, Wallet, Search, Eye } from "lucide-react";
import { searchResults } from "@/constants";

const Payout = () => {
  return (
    <>
      <div className="space-y-6">
        {/* Page Header */}
        <div>
          <h1 className="text-2xl font-bold">Payout</h1>
          <p className="text-muted-foreground">Company Earnings Information</p>
        </div>

        {/* Revenue Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <MetricCard title="Total Revenue" value="$1000" change="76% increase" icon={<DollarSign className="w-5 h-5 text-muted-foreground" />} />
          <MetricCard title="Success Transfer" value="$10000" change="86% increase" icon={<Trophy className="w-5 h-5 text-muted-foreground" />} />
          <MetricCard title="Your Balance" value="$9000" change="26% increase" icon={<Wallet className="w-5 h-5 text-muted-foreground" />} />
        </div>

        {/* Transfer Transaction */}
        <Card>
          <CardHeader>
            <CardTitle>Transfer Transaction</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input placeholder="Find a mentor to make payment transactions" className="pl-10" />
              <Button className="absolute right-2 top-1/2 transform -translate-y-1/2" size="icon">
                <Search className="w-4 h-4" />
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Search Results */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Search Found:</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {searchResults.map((result) => (
                <div key={result.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center space-x-4">
                    <Avatar className="w-12 h-12">
                      <AvatarImage src={result.photo} alt={result.name} />
                      <AvatarFallback>{result.name.slice(0, 2)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="font-medium">{result.name}</h3>
                      <p className="text-muted-foreground">{result.email}</p>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm">
                      <Eye className="w-4 h-4 mr-2" />
                      View
                    </Button>
                    <Button size="sm">Transfer</Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default Payout;
