#include <bits/stdc++.h>
using namespace std;
using ll = long long;

static const ll mod = 1000000007LL;

struct Matrix {
    int n;
    vector<ll> d; // flat n*n row-major
    Matrix() : n(0) {}
    Matrix(int _n) : n(_n), d((size_t)n * n) {}

    inline ll& at(int i, int j) { return d[(size_t)i * n + j]; }
    inline const ll& at(int i, int j) const { return d[(size_t)i * n + j]; }

    static Matrix identity(int n) {
        Matrix I(n);
        for (int i = 0; i < n; ++i) I.at(i,i) = 1;
        return I;
    }

    Matrix operator*(const Matrix& b) const {
        const Matrix &a = *this;
        int N = a.n;
        Matrix c(N);
        // i,k,j loop order with 128-bit accumulation
        for (int i = 0; i < N; ++i) {
            for (int k = 0; k < N; ++k) {
                ll aik = a.at(i,k);
                if (aik == 0) continue;
                for (int j = 0; j < N; ++j) {
                    c.at(i,j) = (c.at(i,j) + (__int128)aik * b.at(k,j)) % mod;
                }
            }
        }
        return c;
    }

    vector<ll> multiplyVec(const vector<ll>& vec) const {
        int N = n;
        vector<ll> ret(N);
        for (int i = 0; i < N; ++i) {
            __int128 acc = 0;
            for (int j = 0; j < N; ++j) acc += (__int128)at(i,j) * vec[j];
            ret[i] = (ll)(acc % mod);
        }
        return ret;
    }

    Matrix operator+(const Matrix& m) const {
        Matrix a(n);
        for (int i = 0; i < n*n; ++i) a.d[i] = (d[i] + m.d[i]) % mod;
        return a;
    }

    Matrix powll(long long p) const {
        assert(p >= 0);
        Matrix a = identity(n);
        Matrix b = *this;
        while (p) {
            if (p & 1) a = a * b;
            b = b * b;
            p >>= 1;
        }
        return a;
    }
};

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);

    vector<string> lines;
    string s;
    while (std::getline(cin, s)) {
        if (!s.empty() && s.back() == '\r') s.pop_back();
        lines.push_back(s);
    }

    map<string,int> mp;
    for (const auto &line : lines) {
        stringstream ss(line);
        string t;
        if (!(ss >> t)) continue;
        if (t.size() >= 2 && t.substr(0,2) == "//") continue;
        if (t[0] >= '0' && t[0] <= '9') continue; // MOO header
        if (t == "}") continue;
        if (t[0] == 'R') {
            string var;
            if (ss >> var) {
                if (mp.find(var) == mp.end()) mp[var] = (int)mp.size()+1;
            }
            break;
        }

        if (mp.find(t) == mp.end()) mp[t] = (int)mp.size()+1;
        string tok;
        while (ss >> tok) {
            if (tok.empty()) continue;
            char c = tok[0];
            if (c == ')' || c == '(' || c == '+' || c == '=') continue;
            if (c >= '0' && c <= '9') continue;
            if (mp.find(tok) == mp.end()) mp[tok] = (int)mp.size()+1;
        }
    }

    int N = (int)mp.size() + 1;
    Matrix IDENTITY = Matrix::identity(N);
    Matrix curMat = IDENTITY;
    vector<pair<Matrix,long long>> matrixes;

    auto start = chrono::high_resolution_clock::now();

    for (const auto &line : lines) {
        stringstream str(line);
        string t;
        if (!(str >> t)) continue;

        // Return Statement
        if (t[0] == 'R') {
            string var;
            if (str >> var) {
                vector<ll> res(N,1);
                res = curMat.multiplyVec(res);
                int idx = mp[var];
                cout << res[idx] << '\n';
            }
            break;
        }

        // Comment
        if (t.size() >= 2 && t.substr(0,2) == "//") continue;

        // MOO loop start
        if (t[0] >= '0' && t[0] <= '9') {
            long long times = stoll(t);
            matrixes.push_back({curMat, times});
            curMat = IDENTITY;
            continue;
        }

        // End of MOO
        if (t == "}") {
            auto &pr = matrixes.back();
            Matrix exp = pr.first; // outer matrix
            long long times = pr.second;
            // curMat ^ times then multiply by outer
            Matrix powered = curMat.powll(times);
            curMat = powered * exp;
            matrixes.pop_back();
            continue;
        }

        // Expression
        if (mp.find(t) == mp.end()) mp[t] = (int)mp.size()+1;
        int idx = mp[t];
        Matrix tmp = IDENTITY;
        tmp.at(idx, idx) = 0;

        string tok;
        while (str >> tok) {
            if (tok.empty()) continue;
            char c = tok[0];
            if (c == ')' || c == '(' || c == '+' || c == '=') continue;
            if (c >= '0' && c <= '9') {
                ll val = stoll(tok);
                tmp.at(idx, 0) = (tmp.at(idx,0) + val) % mod;
            } else {
                int j = mp[tok];
                tmp.at(idx, j) = (tmp.at(idx,j) + 1) % mod;
            }
        }

        curMat = tmp * curMat;
    }

    auto end = chrono::high_resolution_clock::now();
    chrono::duration<double> elapsed = end - start;
    cerr << "Runtime: " << elapsed.count() << "\n";

    return 0;
}