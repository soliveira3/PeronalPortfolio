#include <bits/stdc++.h>
using namespace std;
#define rep(i, a, b) for (ll i = a; i < (ll)(b); ++i)
#define all(x) (x).begin(), (x).end()
#define sz(x) (ll) x.size()
typedef long long ll;
typedef pair<ll, ll> pll;
typedef vector<ll> vll;


ll mod = 1e9+7;


template<class T, int N> struct Matrix {
	typedef Matrix M;
	array<array<T, N>, N> d{};
	M operator*(const M& m) const {
		M a;
		rep(i,0,N) rep(j,0,N)
			rep(k,0,N) a.d[i][j] = (a.d[i][j] + d[i][k]*m.d[k][j]) % mod;
		return a;
	}
	array<T, N> operator*(const array<T, N>& vec) const {
		array<T, N> ret{};
		rep(i,0,N) rep(j,0,N) ret[i] = (ret[i] + d[i][j] * vec[j]) % mod;
		return ret;
	}
    M operator+(const M& m) const {
		M a;
		rep(i,0,N) rep(j,0,N)
			a.d[i][j] = (d[i][j]+m.d[i][j]) % mod;
		return a;
	}
	M operator^(ll p) const {
		assert(p >= 0);
		M a, b(*this);
		rep(i,0,N) a.d[i][i] = 1;
		while (p) {
			if (p&1) a = (a*b);
			b = (b*b);
			p >>= 1;
		}
		return a;
	}
};



int main()
{
    cin.tie(0)->sync_with_stdio(0);
    cin.exceptions(cin.failbit);

    // Storing the matrixes and what to exponentiate by
    Matrix<ll, 101> A, IDENTITY, curMat;
    rep (i, 0, 101) IDENTITY.d[i][i] = 1;
    curMat = IDENTITY;
    vector<pair<Matrix<ll, 101>, ll>> matrixes;
    map<string, ll> mp;
    string s, t;

    auto start = chrono::high_resolution_clock::now();

    ll lineNum = 0;
    while (1)
    {
        getline(cin, s);
        stringstream str(s);
        str >> t;
        lineNum++;

        // Return Statement
        if (t[0] == 'R') {
            str >> t;
            array<ll, 101> res;
            rep (i, 0, 101) res[i] = 1;
            res = curMat*res;
            cout << res[mp[t]] << '\n';
            break;
        }

        // Commented Line
        if (sz(t) >= 2 && t.substr(0,2) == "//")
            continue;

        // we are in a MOO loop
        if (t[0] >= '0' && t[0] <= '9') {
            matrixes.push_back({curMat, stoll(t)});
            curMat = IDENTITY;
        }

        // Ending a MOO loop
        else if (t == "}") {
            // expo
            curMat = curMat^matrixes.back().second;
            curMat = curMat * matrixes.back().first;
            matrixes.pop_back();
        }

        // Expression
        else {
            if (mp.find(t) == mp.end()) mp[t] = sz(mp)+1;
            ll idx = mp[t];
            Matrix<ll, 101> tmp = IDENTITY;
            tmp.d[idx][idx] = 0;

            while (str >> t) {
                if (t[0] == ')' || t[0] == '(' || t[0] == '+' || t[0] == '=') continue;
                if (t[0] >= '0' && t[0] <= '9') tmp.d[idx][0] += (ll)stoll(t);
                else tmp.d[idx][mp[t]]++;
            }

            curMat = tmp * curMat;
        }

    }

    auto end = chrono::high_resolution_clock::now();
    chrono::duration<double> elapsed = end - start;
    cerr << "Runtime: " << elapsed.count() << "\n";
}