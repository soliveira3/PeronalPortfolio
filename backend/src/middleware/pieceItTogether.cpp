#include <bits/stdc++.h>
using namespace std;

int Y, X, W, B, py, px;
vector<string> s;
vector<vector<bool>> u;

void go(int y, int x) {
    if (y < 0 || y >= Y || x < 0 || x >= X) return;
    if (u[y][x]) return;
    u[y][x] = true;

    if (s[y][x] =='.') return;
    if (s[y][x] =='W' && (y + py) % 2 + (x + px) % 2 != 0) return;
    if (s[y][x] =='B' && (y + py) % 2 + (x + px) % 2 != 1) return;
    if (s[y][x] =='W') W++;
    if (s[y][x] =='B') B++;

    go(y - 1, x);
    go(y + 1, x);
    go(y, x - 1);
    go(y, x + 1);
}


int main()
{
    auto start = chrono::high_resolution_clock::now();

    cin >> Y >> X;
    s = vector<string>(Y);
    for (int y = 0; y < Y; y++) cin >> s[y];

    bool ok = true;
    for (px = 0; px < 2; px++)
        for (py = 0; py < 2; py++)
        {
            u = vector<vector<bool>>(Y, vector<bool>(X, false));
            for (int y = 0; y < Y; y++)
                for (int x = 0; x < X; x++)
                {
                    W = B = 0;
                    go(y, x);
                    if (W != B)
                        ok = false;
                }
        }

    cout << (ok ? "YES" : "NO") << endl;

    auto end = chrono::high_resolution_clock::now();
    chrono::duration<double> elapsed = end - start;
    cerr << "Runtime: " << elapsed.count() << " seconds\n\n";
}